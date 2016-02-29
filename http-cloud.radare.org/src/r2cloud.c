#include <stdio.h>

int main(int argc, char **argv) {
	if (argc<1)
		return 1;
	chdir ("/src");
	if (!strcmp (argv[1], "start")) {
		system ("make stop SUDO=");
		system ("make start SUDO=");
	} else if (!strcmp (argv[1], "stop")) {
		system ("make stop SUDO=");
	} else if (!strcmp (argv[1], "update")) {
		system ("make stop SUDO=");
		system ("make update SUDO=");
		system ("make start SUDO=");
	} else if (!strcmp (argv[1], "run")) {
		printf ("running r2\n");
		setegid (1002);
		setgid (1002);
		setuid (1002);
		seteuid (1002);
		system (
			"r2 -q -e scr.color=false -e scr.color=false "
			"-e http.sandbox=true -e http.port=8080 -c=h "
			"/bin/ls >> /opt/sandbox/log 2>&1 & "
			"echo \"'$!'\" >/opt/sandbox/pid"
		);
	}
	return 0;
}
