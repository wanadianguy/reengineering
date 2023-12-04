FROM archlinux:base-devel as app

RUN printf "y\n" | pacman -Syu  && printf "y\n" | pacman -S npm

COPY ./app/ /app/

WORKDIR /app/

CMD npm ci && npm start