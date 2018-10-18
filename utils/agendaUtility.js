
export const mapTodoToAgenda = (todo) => {
  const dateTime = todo.date.split(' ');
  const date = dateTime[0];
  const time = dateTime[1];

  return {
    key: date,
    body: { time, name: todo.name, location: todo.location },
  };
};

export const collectAgendas = (items) => {
  const agendas = {};

  items.forEach((item) => {
    if (item.key in agendas) {
      agendas[item.key].push(item.body);
      return;
    }

    agendas[item.key] = [item.body];
  });
  console.log(agendas);
  return agendas;
};
