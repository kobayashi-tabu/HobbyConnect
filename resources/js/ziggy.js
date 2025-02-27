import { route } from 'ziggy-js';  // ziggy-jsから直接インポート

const Ziggy = {
    "url": "http://localhost",
    "port": null,
    "defaults": {},
    "routes": {
        "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] },
        "welcome": { "uri": "/", "methods": ["GET", "HEAD"] },
        "profile.edit": { "uri": "profile/edit", "methods": ["GET", "HEAD"] },
        "profile.show": { "uri": "profile/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] },
        "profile.update": { "uri": "profile/update", "methods": ["POST"] },
        "tweets.create": { "uri": "tweets/create", "methods": ["GET", "HEAD"] },
        "tweets.index": { "uri": "tweets", "methods": ["GET", "HEAD"] },
        "tweets.store": { "uri": "tweets", "methods": ["POST"] },
        "tweets.update": { "uri": "tweets/{id}", "methods": ["PUT"], "parameters": ["id"] },
        "tweets.destroy": { "uri": "tweets/{id}", "methods": ["DELETE"], "parameters": ["id"] },
        "events.create": { "uri": "events/create", "methods": ["GET", "HEAD"] },
        "storage.local": { "uri": "storage/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] }
    }
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

// Ziggyオブジェクトをexport
if (typeof window !== 'undefined') {
    window.Ziggy = Ziggy;
    window.route = route;  // Ziggyのroute関数をwindowにセット
}

export { Ziggy };
