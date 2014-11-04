#include <stdlib.h>
#include <nfc/nfc.h>
#include <X11/Xlib.h>
#include <X11/keysym.h>
#include <X11/extensions/XTest.h>

int
main(int argc, const char *argv[])
{
	int i =0;
	Display *display;
	unsigned int keycode;
	display = XOpenDisplay(NULL);

	for(i = 0; i < 10; i++)
	{
		KeySym sym_a = XStringToKeysym(argv[i]);
		keycode = XKeysymToKeycode(display, sym_a);
		XTestFakeKeyEvent(display, keycode, True, 0);
		XTestFakeKeyEvent(display, keycode, False, 0);
		XFlush(display);
	}
}