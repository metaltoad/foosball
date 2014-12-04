#include <stdlib.h>
#include <nfc/nfc.h>
#include <X11/Xlib.h>
#include <X11/keysym.h>
#include <X11/extensions/XTest.h>

static void 
printchar(char *c)
{
    int i =0;
    Display *display;
    unsigned int keycode;
    display = XOpenDisplay(NULL);

    for(i = 0; i < 11; i++) 
    {

        char buf[2];

        sprintf(buf, "%c", c[i]);

        KeySym sym_a = XStringToKeysym(buf);
        keycode = XKeysymToKeycode(display, sym_a);
        XTestFakeKeyEvent(display, keycode, True, 0);
        XTestFakeKeyEvent(display, keycode, False, 0);
        XFlush(display);
    }

}

void prepend(char* s, const char* t) {
    size_t len = strlen(t);
    size_t i;

    memmove(s + len, s, strlen(s) + 1);

    for(i = 0; i < len; i++) {

            s[i] = t[i];
    }
}

static void
get_uid(const uint8_t *pbtData, const size_t szBytes, const char* num)
{
    size_t  szPos;
    char buf[50];

    for (szPos = 0; szPos < szBytes; szPos++) {
        sprintf(buf + strlen(buf),"%d", pbtData[szPos]);
    }

    prepend(buf, num);
    printchar(buf);
    memset(&buf[0], 0, sizeof(buf));
}

int
main(int argc, const char *argv[])
{

    Display *display;
    unsigned int keycode;
    display = XOpenDisplay(NULL);

    nfc_device *pnd;
    nfc_target nt;
    char *lastid;
    char uid[50];

    // Allocate only a pointer to nfc_context
    nfc_context *context;

    // Initialize libnfc and set the nfc_context
    nfc_init(&context);
    if (context == NULL) {
      printf("Unable to init libnfc (malloc)\n");
      exit(EXIT_FAILURE);
    }

    // Display libnfc version
    const char *acLibnfcVersion = nfc_version();
    (void)argc;
    printf("%s uses libnfc %s\n", argv[0], acLibnfcVersion);

    // Open, using the first available NFC device which can be in order of selection:
    //   - default device specified using environment variable or
    //   - first specified device in libnfc.conf (/etc/nfc) or
    //   - first specified device in device-configuration directory (/etc/nfc/devices.d) or
    //   - first auto-detected (if feature is not disabled in libnfc.conf) device
    pnd = nfc_open(context, argv[1]);

    if (pnd == NULL) {
      printf("ERROR: %s\n", "Unable to open NFC device.");
      exit(EXIT_FAILURE);
    }
    // Set opened NFC device to initiator mode
    if (nfc_initiator_init(pnd) < 0) {
      nfc_perror(pnd, "nfc_initiator_init");
      exit(EXIT_FAILURE);
    }

    printf("NFC reader: %s opened\n", nfc_device_get_name(pnd));

    // Poll for a ISO14443A (MIFARE) tag
    const nfc_modulation nmMifare = {
      .nmt = NMT_ISO14443A,
      .nbr = NBR_106,
    };

    int timeout =16;
    do {
      if (nfc_initiator_select_passive_target(pnd, nmMifare, NULL, 0, &nt) > 0) {

          if(timeout > 15) {
            get_uid(nt.nti.nai.abtUid, nt.nti.nai.szUidLen, argv[2]); 
            timeout = 0;
          }
            timeout++;
      }
    }while(true);
      // Close NFC device
      nfc_close(pnd);
      // Release the context
      nfc_exit(context);
      exit(EXIT_SUCCESS);
}
