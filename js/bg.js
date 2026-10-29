(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* scroll progress */
  var prog = document.getElementById('progress');
  function onScroll() {
    var h = root.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* cursor spotlight */
  addEventListener('pointermove', function (e) {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });


  /* animated particle network background */
  var cv = document.getElementById('bg'), ctx = cv.getContext('2d'), pts = [], stars = [], shooters = [], W, H, dpr = Math.min(devicePixelRatio || 1, 2);
  var mouse = { x: -999, y: -999 }, lastY = 0, boost = 0;
  function size() {
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(Math.floor(W * H / 16000), 90);
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2 });
    stars = [];
    var sn = Math.min(Math.floor(W * H / 2600), 520);
    for (var k = 0; k < sn; k++) stars.push(newStar(true));
  }
  function newStar(anywhere) {
    return { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: anywhere ? Math.random() : 1, pz: 1, hue: Math.random() < .25 ? '186,230,253' : (Math.random() < .2 ? '253,225,190' : '255,255,255') };
  }
  addEventListener('resize', size); size();
  addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var light = root.dataset.theme === 'light';
    if (light) { requestAnimationFrame(draw); return; }
    var col = light ? '37,99,235' : '59,156,255';
    var now = performance.now() / 1000;

    /* drifting aurora */
    var t = now * (reduce ? .06 : .15);
    var blobs = [
      [.75 + Math.sin(t) * .12, .2 + Math.cos(t * .8) * .1, light ? 'rgba(56,189,248,.12)' : 'rgba(99,102,241,.22)'],
      [.15 + Math.cos(t * .7) * .12, .8 + Math.sin(t) * .1, light ? 'rgba(37,99,235,.10)' : 'rgba(59,130,246,.16)'],
      [.5 + Math.sin(t * .6 + 2) * .2, .5 + Math.cos(t * .9) * .15, light ? 'rgba(168,85,247,.07)' : 'rgba(168,85,247,.12)']
    ];
    for (var bi = 0; bi < blobs.length; bi++) {
      var bl = blobs[bi], rg = ctx.createRadialGradient(W * bl[0], H * bl[1], 0, W * bl[0], H * bl[1], Math.max(W, H) * .5);
      rg.addColorStop(0, bl[2]); rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    }

    /* warp-speed starfield: speeds up with scroll, steers toward the cursor */
    var sv = Math.min(Math.abs(scrollY - lastY), 80); lastY = scrollY;
    boost += (sv / 80 - boost) * .08;
    var speed = reduce ? .0015 : .003 + boost * .02;
    var cx = W / 2 + (mouse.x < 0 ? 0 : (mouse.x / W - .5) * W * .35), cy = H / 2 + (mouse.y < 0 ? 0 : (mouse.y / H - .5) * H * .35), f = Math.max(W, H) * .5;
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s];
      st.pz = st.z; st.z -= speed;
      if (st.z <= .02) { stars[s] = st = newStar(false); }
      var x1 = cx + st.x / st.z * f * .5, y1 = cy + st.y / st.z * f * .5;
      var x0 = cx + st.x / st.pz * f * .5, y0 = cy + st.y / st.pz * f * .5;
      if (x1 < -50 || x1 > W + 50 || y1 < -50 || y1 > H + 50) { stars[s] = newStar(false); continue; }
      var near = 1 - st.z, al = Math.min(1, near * 1.6 + .15);
      ctx.strokeStyle = light ? 'rgba(15,23,42,' + (al * .5) + ')' : 'rgba(' + st.hue + ',' + al + ')';
      ctx.lineWidth = .5 + near * 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 + (x1 - x0) * .6, y1 + (y1 - y0) * .6); ctx.stroke();
    }
    ctx.lineWidth = 1;

    /* shooting stars */
    if (Math.random() < .015 && shooters.length < 4) {
      var ang = .45 + Math.random() * .35, v = 5 + Math.random() * 4, fromLeft = Math.random() < .5;
      shooters.push({ x: fromLeft ? Math.random() * W * .5 : W * .5 + Math.random() * W * .5, y: -20 + Math.random() * H * .35,
        vx: (fromLeft ? 1 : -1) * Math.cos(ang) * v, vy: Math.sin(ang) * v, life: 1, len: 10 + Math.random() * 8 });
    }
    for (var q = shooters.length - 1; q >= 0; q--) {
      var sh = shooters[q];
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= .006;
      if (sh.life <= 0 || sh.x < -200 || sh.x > W + 200 || sh.y > H + 200) { shooters.splice(q, 1); continue; }
      var tx = sh.x - sh.vx * sh.len, ty = sh.y - sh.vy * sh.len, a2 = Math.min(1, sh.life * 2);
      var gr = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
      gr.addColorStop(0, light ? 'rgba(15,23,42,' + a2 * .8 + ')' : 'rgba(255,255,255,' + a2 + ')');
      gr.addColorStop(.3, light ? 'rgba(56,189,248,' + a2 * .4 + ')' : 'rgba(120,220,255,' + a2 * .5 + ')');
      gr.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.strokeStyle = gr; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.fillStyle = light ? 'rgba(15,23,42,' + a2 + ')' : 'rgba(255,255,255,' + a2 + ')';
      ctx.shadowColor = '#7dd3fc'; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.arc(sh.x, sh.y, 2.4, 0, 6.283); ctx.fill();
      ctx.shadowBlur = 0; ctx.lineWidth = 1; ctx.lineCap = 'butt';
    }

    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      a.x += a.vx * (reduce ? .4 : 1); a.y += a.vy * (reduce ? .4 : 1);
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      ctx.fillStyle = 'rgba(' + col + ',.55)';
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
        if (d < 14000) {
          ctx.strokeStyle = 'rgba(' + col + ',' + (.16 * (1 - d / 14000)) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      var mx = a.x - mouse.x, my = a.y - mouse.y, md = mx * mx + my * my;
      if (md < 25000) {
        ctx.strokeStyle = 'rgba(56,189,248,' + (.35 * (1 - md / 25000)) + ')';
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
