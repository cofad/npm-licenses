import { FetchEvent } from "./fetch-event.ts";

export function main(): void {
  addFetchEventListener(handleFetchEvent);
}

function addFetchEventListener(
  callback: (request: Request) => Promise<Response>
): void {
  // @ts-ignore: Argument of type '(event: FetchEvent) => void' is not assignable to parameter of type 'EventListenerOrEventListenerObject | null'.
  addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(callback(event.request));
  });
}

async function handleFetchEvent(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname === "/" || pathname === "/home") {
    const homeFile = await Deno.readFile("./home.html");

    return new Response(homeFile, {
      status: 200,
      headers: {
        server: "deploy",
        "content-type": "text/html; charset=UTF-8",
      },
    });
  } else {
    const pathnameArray = pathname.split("/");
    const packageName = pathnameArray[1];
    const version = pathnameArray[2];

    const response = await fetch(
      `https://registry.npmjs.org/${packageName}/${version}`,
      {
        headers: { accept: "application/json" },
      }
    );

    if (response.ok) {
      const { name, version, dependencies } = await response.json();

      return new Response(
        JSON.stringify({
          name: name,
          version: version,
          dependencies: dependencies,
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } else {
      return new Response("404: resource not found", {
        status: 404,
        headers: { "content-type": "text/plain" },
      });
    }
  }
}
