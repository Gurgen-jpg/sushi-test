export const columns = [
    {
        header: 'Дата добавления',
        accessor: 'addDate',
        sorted: true,
    },
    {
        header: 'Тип заявки',
        accessor: 'type',
        sorted: true,
    },
    {
        header: 'Готовность',
        accessor: 'status',
        sorted: false,
    },
    {
        header: 'Статус',
        accessor: 'progress',
        sorted: false,
    },
    {
        header: 'Автор',
        accessor: 'author',
        sorted: false,
    },
    {
        header: 'Текст',
        accessor: 'requestText',
        sorted: false,
    },
]