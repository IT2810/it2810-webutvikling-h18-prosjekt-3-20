Personal Information Manager
============================

# Kalender

https://github.com/wix/react-native-calendars

# Dele props med screen komponenter

I flere tilfeller ønsker vi at screen komponenter skal få tilgang til ekstra props.
Eksempelvis vil vi kanskje at komponenten skal få tilgang til en funksjon
som laster inn data fra server eller lokalt lager.

```jsx
const HomeStack = createStackNavigator({
  Home: {
    screen: props => <HomeScreen
      // Sender videre eventuelle props vi mottar fra oven
      {...props}
      // Legg inn dine egne props under

      getTodos: () => ['todo 1', 'todo 2'] // Eksempel på en funksjon som prop
    />,
  },
});
```

Slik trenger screen komponenten kun å ha et forhold til en property,
i stedet for å måtte importere biblioteket funksjonen selv.

```jsx
// Inne i render funksjonen til en komponent
render() {
    this.props.getTodos(); // ['todo 1', 'todo 2']
}
```

I tillegg blir det vesentlig enklere å teste, fordi vi sparer oss fra
å måtte "mocke" en intern funksjon, vi kan i stedet sende inn en dummy funksjon til komponenten.

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
