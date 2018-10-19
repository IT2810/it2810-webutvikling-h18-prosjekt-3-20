Personal Information Manager
============================

Personal Information Manager er en applikasjon hvor du kan opprette geografisk og tidsavhengige todo elementer. Det vil si at en todo vil huske hvor du opprettet elementet, og gir deg mulighet til å velge en forfallsdato.

Listen over todos vil deretter være presentable i en kalender og på et kart. I tillegg kan listen sorteres over hvor nærme hver todo er geografisk plassert i forhold til deg.

# Platformuavhengighet
Et av kravene for prosjektet var at applikasjonen skulle fungere uavhengig av plattform. Den måtte altså fungere både på ios og Android.

Utfordringen vi støtte på i vår gruppe, var at ingen av oss hadde en Android enhet tilgjengelig, og måtte derfor stort sett ta utgangspunkt i Android Emulatorer.

Den største begrensningen vi møtte på var at, [GPS ikkje fungerer i Sketch på Android Emulatorer](https://docs.expo.io/versions/latest/sdk/location). Gjorde kartvisningen og opprettelse av todos (som trenger gps posisjon) utfordrende å teste på begge plattformer.

Vi fikk derimot testet applikasjonen på en Android enhet, i løpet av prosjektperioden, hvor all funksjonalitet så ut til å fungere (Se mappen `docs/android` for skjermbilder. Sist oppdatert *17.10.2018*).

Uansett tar vi forbehold om at applikasjonen kan ha funksjonelle og grafiske feil, som et resultat av at vi ikke har Android enheter tilgjengelig.

# Tredjepartskomponenter
## React Native Calendards

For å lage kalender og agenda er det brukt tredjepartskomponenter fra https://github.com/wix/react-native-calendars.
Disse komponentene gir mulighet for stor grad av tilpassing, og alle parameterne er valgfrie. 

### Agenda

Importer komponenten:

```js
Import { Agenda } from 'react-native-calendars';
```
Koden under viser hvordan Agenda komponenten er brukt i prosjektet. 

```jsx
<Agenda 
  items={collectAgendas(todos.map(todo => mapTodoToAgenda(todo)))}
  renderItem={item => <AgendaItem item={item}/>}
  rowHasChanged={this.rowHasChanged}
  selected={this.state.currentDate}
  markedDates={{
    [this.state.currentDate]: {
      selected: true,
      marked: true,
    },
  }}/>
```

Alle todos som vises i agendaen gis på formen

```js
const items = {
  'YYYY-MM-DD': [{name: '', time: '', location:''}],
  'YYYY-MM-DD': [{name: '', time:'', location:''}],
  'YYYY-MM-DD': [{name: '', time: '', location:''}, {name: '', time:'', location:''}],
}
```
* renderItem spesifiserer hvordan hver todo skal rendres i agendalisten
* markedDates lar deg spesifisere hvordan datoene i agendaen skal markeres. 
* selected viser initielt valgt dag, og er satt til nåværende dato.

I tillegg finnes mange flere muligheter for å tilpasse agendaen, som er godt dokumentert på https://github.com/wix/react-native-calendars.

## React Native Maps
https://github.com/react-community/react-native-maps

Brukes til å laste inn kartvisninger i applikasjoner, enten i Apple Maps eller Google Maps, avhengig av plattform. I tillegg gir biblioteket oss mulighet til å legge på grafiske elementer på kartet, som vi gjør for hvert todo element.

Bruk av biblioteket er godt dokumentert av [React-Native-Maps](https://github.com/react-community/react-native-maps). Ellers kan en også finne eksempler på bruk i `screens/MapScreen.js` og `components/TodoMarker.js`.


## FlatList

FlatList er et bibliotek som gjør det veldig enkelt å rendre lister i React Native og fungerer på tvers av plattformer. Dataelementene som skal rendres som en liste legger man ved i `data={}` og måten hvert element skal rendres på definerer man gjennom `renderItem={}`. For å sørge for at FlatListen oppdateres når dataelementene som er lagret i `this.state`endres setter man `extraData={this.state}`. I eksempelet under ligger todo-elementene lagret i `this.props.todos`, så derfor `extraData={this.props.todos}`.

Dersom du ikke har et eget key-attributt, må du gi flatlisten en måte å indentifisere de ulike listeelementene på, dette kan du gjøre med `keyExtractor={}`.

For dokumentasjon og fler eksempler for bruk av FlatList se:

* https://facebook.github.io/react-native/docs/flatlist 

### Eksempel

```js
import { FlatList } from 'react-native';
.
.
.

render() {
    return (
      <List>
        <FlatList
          data={this.props.todos}
          extraData={this.props}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onRemoveTodo={this.props.onRemoveTodo}
              onCheckBoxPress={this.props.onCheckBoxPress}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    );
  }
```
*Eksempel for bruk av FlatList hentet fra TodoList.js*

# Persistent lagring

Alle todos vil lagres persistent på mobilen, gjennom `AsyncStorage`. I tillegg har vi et abstraksjonslag mellom applikasjonen vår og `AsyncStorage`, som gir oss enkle hjelpefunksjoner for _lagring_, _henting_ og _fjerning_. Denne abstraksjonen ligger i `utils/storage.js`.

## Lagre til AsyncStorage
Lagring trenger to argumenter:
* En nøkkel (key), som blir identifikatoren til dataen. Obs. dupliserte nøkler vil overskrive hverandre
* Dataen du vil lagre. Denne vil automatisk konvertere verdier til JSON, så du slipper å kalle `JSON.stringify()` selv.

```js
import { save } from './utils/storage';

async testFunction() {
  // Lagre objektet i AsyncStorage gjennom 'testKey'
  await save('testKey', { name: 'Hello world', timestamp: 1539853933840 });
  
  // Dataen kan nå hentes fra `getByKey` i `utils/storage`
}
```

## Hente fra AsyncStorage
For å hente fra AsyncStorage trenger du kun nøkkelen til dataen.

```js
import { getByKey } from './utils/storage';

async testFunction() {
  const data = await getByKey('testKey');
  
  console.log(data) // => { name: 'Hello world', timestamp: 1539853933840 }
}
```

## Fjerne data fra AsyncStorage
For å fjerne fra AsyncStorage trenger du kun nøkkelen til dataen du vil ha bort.

```js
import { removeByKey } form './utils/storage';

async testFunction() {
  const success = await removeByKey('testKey');
  console.log(success); // => true eller false
}
```

# Tilstandskontroll

Siden listen over todos er delt over flere visninger i applikasjonen, vart det ønskelig å ha en sentral aksesspunkt for data, fordelsvis på rotnivå (altså i `App.js`). Samtidig vil vi unngå å måtte sende denne dataen gjennom en lang kjede av `props`, fra rot- til løv-komponent.

I tillegg ønsker vi at mutering av eksisterende data kun kan skje gjennom bestemte funksjoner til det sentrale aksesspunktet.

Disse to kravene hjelper oss å få en _single source of truth_.

Alternativer som ble vurdert er Redux og React Context API. Redux bygger på universelle prinsipper om mutering og tilstand, men er hovedsakelig rettet mot større applikasjoner. Det krever i tillegg installering av flere tredjepartspakker. React Context API er vesentlig enklere og mindre funksjonell, men har mindre overhead og ligger tilgjengelig i React (>= versjon 16) allerede.

Vi besluttet derfor å spare "unødvendig" overhead, og gikk for React Context API.

## Oppsett

Vi fulgte fremgangsmåten i React dokumentasjonen https://reactjs.org/docs/context.html.

* Definerte en egen kontekst i `utils/TodoContext.js`.
* `Provider` binder vi til tilstanden til `App.js`, hvor vi også definerer funksjoner for å kunne mutere todo elementene.
* `Consumer` brukes der vi trenger tilgang til todos, eksempelvis i `screen/`-komponentene.

# Testing

## Snapshottesting

I vanlig React DOM brukes gjerne enzyme til å også håndtere snapshottesting, ved hjelp av `render` eller `shallow` funksjonene.
I React native blir dette derimot litt problematisk, hvor render vil sende mange klager. Alternativt kunne `shallow` brukes,
men denne genererer snapshot-filer som er vanskelig å lese, i React native.

Beste alternativ er derfor å bruke `react-test-renderer` til å håndtere snapshottesting av enkle komponenter,
fordi vi da får snapshot-filer som er lesbare av et menneske. Eksempel på dette ligger under:

```jsx
import { MonoText } from 'styled-text';

const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
expect(tree).toMatchSnapshot();
```

## Legge til Enzyme i React native prosjekt

En problematikk som vi støtte på,
og som var nær umulig å debugge på en skikkelig måte var mismatch mellom `react` og `react-dom`. Denne mistmatchen førte til at enzyme klagde på oss med feilmeldingen:

```bash
TypeError: window.addEventListener is not a function
```

Den enkle løsningen var bare å tvinge `react@<versjon>` og `react-dom@<version>` til å være like.

> Merk at enzyme of React native fortsatt snakker rimelig dårlig med hverandre, så i flere tilfeller er det bedre å bruke react-test-renderer

