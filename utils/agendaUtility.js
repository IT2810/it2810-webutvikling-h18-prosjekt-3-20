
/**
 * Maps each todo into an Agenda,
 * readable by react-native-calendars's Agenda component.
 * Is still in list format, it must first be piped
 * through collectAgendas
 *
 * @param {array} todo List of created todos
 * @return {array} list of agendas and an associated key (used by collectAgendas)
 * */
export const mapTodoToAgenda = (todo) => {
  const dateTime = todo.date.split(' ');
  const date = dateTime[0];
  const time = dateTime[1];

  return {
    // key is used by collectAgendas
    key: date,
    body: { time, name: todo.name },
  };
};

/**
 * Accepts a list of agendas,
 * and collects them into an object of agendas,
 * directly readable by react-native-calendars's Agenda component.
 *
 * @param {array} items List of agendas
 * @return {object} Agendas collected into an object
 * */
export const collectAgendas = (items) => {
  const agendas = {};

  items.forEach((item) => {
    // Append items with the same date onto same agenda
    if (item.key in agendas) {
      agendas[item.key].push(item.body);
      return;
    }

    agendas[item.key] = [item.body];
  });

  return agendas;
};
