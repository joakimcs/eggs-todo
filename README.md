# Losby Gård

Prosjekt som vi har ledet fra ende til annen. Plapre har levert nettstedet. (Helhus prosjekt). Ikke fått gjennomført alt vi ønsket å gjøre.

* Sporing, SEO, redirects har vært RPs ansvar. Mangler litt på sporing, dette er et issue. 
* Gavekortbestilling, implementert som Enhanced Ecommerce.
* Kontaktforespørsler om selskap, kurs/konferanse, bryllup - må rettes
* Rom Booking, foregår på eksternt domene (gc.synxis.com) - Kontaktperson hos de historiske om dette <jeanette@dehistoriske.no>
* Finnes ikke budsjett på det. Men setter noen timer på betalt søk.
* Wordpress-site
* Test site: <http://losbygods.dev.plastikk.no/>

## Endringer i GTM

1. Endret navngivning for å få litt bedre ovesikt
2. Rettet outbound links til å ikke trigge på alle lenker 
3. Fjernet heartbeat funksjon som produserte veldig mange eventer
4. Satt opp ny tag og trigger for å fange NinjaForm Events


## Endringer i Wordpress (Plapre)

[losbygods/wp-content/themes/losbytheme/js/script.js:230](https://github.com/plastikk/losbygods/blob/009cc0a8a30c4fd22ff434ee0a63f0f176d370db/wp-content/themes/losbytheme/js/script.js#L230)

```javascript
$(document).on('submitResponse', function( e, response ){
        // Form is submitted without errors
        if ( response.errors == false ) {
            // Grab form id and match Ninja Form id from WP backend - only way to know which kind of form submitted
            var formName = $(".ninja-forms-form").attr("id");
            switch (formName) {
                case "ninja_forms_form_5":
                    trackEvent('form', 'Konferanse og aktivitet', 'submit', 0, 0)
                    console.log("test");
                    break;
                case "ninja_forms_form_9":
                    trackEvent('form', 'Opplevelse / Generelt', 'submit', 0, 0)
                    break;
                case "ninja_forms_form_13":
                    trackEvent('form', 'Selskap', 'submit', 0, 0)
                    break;                    
                default:
                    trackEvent('form', 'Ukjent skjema', 'submit', 0, 0)
                    break;
            }

        }
        return true;
    });
});
```

Ny kode:

```javascript
$(document).on('submitResponse', function( e, response ){
	dataLayer.push({
	    "event":"submitResponse",
		"ninjaform":response,
	});
});
```
Jeg har fikset Tagmanager containeren slik at den er klar til å ta imot nye slike events.

## Mulige enkle forbedringer (neste steg)

* Det er to verdier vi kanskje kunne fått inn på disse bestillingskjemaene:
**tiden mellom event og booking** - altså hvor lenge det er til kunden skal handle og **antall personer**
* Ellers hadde det vært kurrant å få satt opp cross-site tracking mot gc.synxis.com, slik at vi kan tracke kundens reise på siten helt ut.
* Vi burde tracket endel her som virtuelle sidevisninger isteden for events. Da vi kan få ut navigasjonsmønstre før konvertering...
* Innsendte skjema kan brukes til å sette User_ID, dette kan igjen brukes til å sy sessioner sammen og fjerne duplikater osv.

