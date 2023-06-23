import http from "http";
import findMyWay from "find-my-way";

const router = findMyWay();

function createApplication() {
  const app = {
    get: (path: string, handler: () => http.ServerResponse) => {
      router.on("GET", path, handler);
    },
    post: (path: string, handler: () => http.ServerResponse) => {
      router.on("POST", path, handler);
    },
    put: (path: string, handler: () => http.ServerResponse) => {
      router.on("PUT", path, handler);
    },
    delete: (path: string, handler: () => http.ServerResponse) => {
      router.on("DELETE", path, handler);
    },
    patch: (path: string, handler: () => http.ServerResponse) => {
      router.on("PATCH", path, handler);
    },
    listen: function (port = 3000, callback: () => http.Server) {
      const server = http.createServer(async (req, res) => {
        router.lookup(req, res);
      });
      return server.listen(port, callback);
    },
  };

  return app;
}

export default createApplication;
