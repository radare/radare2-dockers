#!/bin/sh

ROOT=/src/app

echo Running node
${SUDO} /sbin/setcap cap_net_bind_service=+ep /usr/bin/node
cd $ROOT
rm -f /opt/sandbox/node.end
while : ; do
	sleep 1
	echo "Cloud node listening..."
	node index.js > /opt/sandbox/node.log 2>&1
	[ -f /opt/sandbox/node.end ] && break
done
