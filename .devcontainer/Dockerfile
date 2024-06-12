FROM mcr.microsoft.com/devcontainers/typescript-node:20

RUN sudo apt-get update && \
    sudo apt-get install -y pip && \
    sudo pip install awscli awscli-local --break-system-packages

CMD ["tail", "-f", "/dev/null"]

