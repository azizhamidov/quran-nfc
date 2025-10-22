// worker/index.js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1️⃣ Verify NFC tag
    if (path === "/verify") {
      const tagId = url.searchParams.get("tag");
      const token = url.searchParams.get("token");

      if (!tagId || !token) {
        return new Response("Missing tag or token", { status: 400 });
      }

      // Fetch the tag object from KV
      const tagData = await env.TAGS_KV.get(tagId, { type: "json" });

      if (!tagData) {
        return new Response("Invalid tag", { status: 403 });
      }

      if (tagData.token !== token) {
        return new Response("Invalid token", { status: 403 });
      }

      if (!tagData.active) {
        return new Response("Tag is inactive", { status: 403 });
      }

      // Optional: increment usage count
      tagData.uses = (tagData.uses || 0) + 1;
      await env.TAGS_KV.put(tagId, JSON.stringify(tagData));

      // Create session
      const sessionId = crypto.randomUUID();
      await env.SESSIONS_KV.put(sessionId, tagId, { expirationTtl: 3600 }); // 1 hour

      // Redirect to your React app with session param
      return Response.redirect(
        `https://quranverse.online/?session=${sessionId}`,
        302
      );
    }

    // 2️⃣ Check session from React app
    if (path === "/check-session") {
      const sessionId = url.searchParams.get("session");
      if (!sessionId) {
        return new Response("Missing session", { status: 400 });
      }

      const tagId = await env.SESSIONS_KV.get(sessionId);
      if (!tagId) {
        return new Response("Invalid session", { status: 403 });
      }

      return new Response("OK", { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  },
};
