export function main(): void {
  addEventListener();
}

function addEventListner(): void {
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
}

function handleRequest(request: Request) {
  return new Response(request.url, {
    status: 200,
    headers: {
      server: "deploy",
      "content-type": "text/plain",
    },
  });
}
