FROM suteqa/go-web
COPY ./dist/build/h5/ /html/

LABEL traefik.enable=true
LABEL traefik.http.routers.mall-mobile.entrypoints=websecure
LABEL traefik.http.routers.mall-mobile.rule=Host(`mall-mobile.idb.com.cn`)
LABEL traefik.http.services.mall-mobile.loadbalancer.server.port=9090
