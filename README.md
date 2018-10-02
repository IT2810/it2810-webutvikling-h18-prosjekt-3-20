Personal Information Manager
============================

## Kalender

https://github.com/wix/react-native-calendars

# Testing

## Snapshottesting

I vanlig React DOM vil en kunne bruke enzyme til å også håndtere snapshottesting, ved hjelp av `render` funksjonen.
Dette blir derimot litt problematisk i React native, hvor render vil sende mange klager. Alternativet er å bruke `shallow`,
men den genererer snapshot-filer som er vanskelig å lese i React native.

Beste alternativ er derfor å bruke `react-test-renderer` til å håndtere snapshottesting av enkle komponenter,
fordi vi da får snapshot-filer som er lesbare av et menneske. Eksempel på dette ligger under:

````jsx
import { MonoText } from 'styled-text';

const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
expect(tree).toMatchSnapshot();
```

## Legge til Enzyme i React native prosjekt

En problematikk som vi støtte på,
og som var nær umulig å debugge på ein skikkelig måte var mismatch mellom `react` og `react-dom`.
Dette førte til at enzyme ville klage på oss med feilmeldingen:

```bash
TypeError: window.addEventListener is not a function
```
Den enkle løsningen var bare å tvinge `react@<versjon>` og `react-dom@<version>` til å være like.
