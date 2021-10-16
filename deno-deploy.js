addEventListener("fetch", (event) => {
  event.respondWith(
    new Response("Test", {
      status: 200,
      headers: {
        server: "deploy",
        "content-type": "text/plain",
      },
    }),
  );
});
