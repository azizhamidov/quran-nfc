export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1️⃣ NFC tag verification endpoint
    if (url.pathname === "/verify") {
      const tagId = url.searchParams.get("tag");
      const token = url.searchParams.get("token");

      if (!tagId || !token) {
        return new Response("Missing tag or token", { status: 400 });
      }

      const tagData = await env.TAGS_KV.get(tagId, { type: "json" });
      if (!tagData || tagData.token !== token || !tagData.active) {
        return new Response("Invalid tag", { status: 403 });
      }

      // Create a session
      const sessionId = crypto.randomUUID();
      await env.SESSIONS_KV.put(sessionId, tagId, { expirationTtl: 3600 });

      // Redirect to React app with session
      return Response.redirect(`https://quranverse.online/?session=${sessionId}`, 302);
    }

    // 2️⃣ Session check for React app
    if (url.pathname === "/" || url.pathname.startsWith("/index.html")) {
      const session = url.searchParams.get("session");
      if (!session) {
        // No session → redirect to /verify
        return Response.redirect(`https://your-worker.workers.dev/verify`, 302);
      }

      const tagId = await env.SESSIONS_KV.get(session);
      if (!tagId) {
        return Response.redirect(`https://your-worker.workers.dev/verify`, 302);
      }

      // Session is valid → serve React app
      const html = await fetch("https://raw.githubusercontent.com/yourusername/quran-nfc-react/main/build/index.html").then(r => r.text());

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // 3️⃣ Optional: session API
    if (url.pathname === "/check-session") {
      const session = url.searchParams.get("session");
      if (!session) return new Response("Missing session", { status: 400 });

      const tagId = await env.SESSIONS_KV.get(session);
      if (!tagId) return new Response("Invalid session", { status: 403 });

      return new Response("OK", { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  },
};
