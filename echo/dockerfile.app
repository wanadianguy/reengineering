FROM archlinux:base-devel as app

RUN pacman -Syu --noconfirm  &&  pacman -S npm --noconfirm

COPY ./app/ /app/

WORKDIR /app/

CMD npm ci && npm start