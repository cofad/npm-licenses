export function main() {
  addEventListener("fetch", (event) => {
    event.respondWith(
      new Response("Test two", {
        status: 200,
        headers: {
          server: "deploy",
          "content-type": "text/plain",
        },
      })
    );
  });
}
