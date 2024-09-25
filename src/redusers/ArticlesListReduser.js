import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // articles: [
    //     {
    //         slug: 'new-article-3hkyg9',
    //         title: 'asdasda    ',
    //         description: 'new article',
    //         body: 'a ',
    //         createdAt: '2024-09-22T14:38:04.662Z',
    //         updatedAt: '2024-09-23T15:32:40.998Z',
    //         tagList: ['white_russian'],
    //         favorited: false,
    //         favoritesCount: 1,
    //         author: {
    //             username: 'biglebowski',
    //             bio: 'I have a nice rug! Dude abides!',
    //             image: 'https://filmschoolrejects.com/wp-content/uploads/2020/04/BigLebowski-700x480.jpg',
    //             following: false,
    //         },
    //     },
    //     {
    //         slug: 'dasv-5v5kkn',
    //         title: 'dasv',
    //         description: 'adsv',
    //         body: 'adsv\nasdvasdv',
    //         createdAt: '2024-09-22T13:51:34.231Z',
    //         updatedAt: '2024-09-22T13:52:13.438Z',
    //         tagList: [],
    //         favorited: false,
    //         favoritesCount: 1,
    //         author: {
    //             username: 'vads',
    //             image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    //             following: false,
    //         },
    //     },
    //     {
    //         slug: 'asdf-r8swxy',
    //         title: 'asdf',
    //         description: 'sdf',
    //         body: 'asdfsadf',
    //         createdAt: '2024-09-22T05:59:30.840Z',
    //         updatedAt: '2024-09-22T10:05:27.521Z',
    //         tagList: [],
    //         favorited: false,
    //         favoritesCount: 0,
    //         author: {
    //             username: 'sadff',
    //             image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    //             following: false,
    //         },
    //     },
    //     {
    //         slug: 'notag4-3vianc',
    //         title: 'notag4',
    //         description: 'asdf',
    //         body: "```markdown\n# Пример кода на Python\nЭтот документ демонстрирует\n## Установка\nДля начала \n```bash\npip install requests\n```\n\n## Пример кода\n\nНиже приведен пример \n```python\nimport requests\n\ndef get_data(url):\n    response = requests.get(url)\n    if response.status_code == 200:\n        return response.json()\n    else:\n        return None\n\nurl = 'https://api.example.com/data'\ndata = get_data(url)\n\n```\n\n## Заключение\n\nЭтот пример показыва\n```\n",
    //         createdAt: '2024-09-22T05:51:01.530Z',
    //         updatedAt: '2024-09-22T15:15:46.522Z',
    //         tagList: [],
    //         favorited: false,
    //         favoritesCount: 3,
    //         author: {
    //             username: 'drulina',
    //             image: 'https://i.pinimg.com/564x/2d/b9/00/2db9004b5969d123191db46eb3325f4e.jpg',
    //             following: false,
    //         },
    //     },
    //     {
    //         slug: '23-q3tbh7',
    //         title: '23',
    //         description: '2',
    //         body: '4у',
    //         createdAt: '2024-09-21T14:31:14.721Z',
    //         updatedAt: '2024-09-22T05:45:53.680Z',
    //         tagList: ['вук', 'цу', 'ы'],
    //         favorited: false,
    //         favoritesCount: 2,
    //         author: {
    //             username: 'lol1',
    //             image: 'https://1avatara.ru/pic/animal/animal0001.jpg',
    //             following: false,
    //         },
    //     },
    // ],
    currentPage: 1,
    // articlesCount: 119,
};

const ArticlesListReduser = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addPosts: (state, action) => {
            return { ...state, posts: [...state.posts, ...action.payload] };
        },
        toggleCurrentPage: (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.currentPage = payload;
        },
    },
});

export const { addPosts, toggleCurrentPage } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
