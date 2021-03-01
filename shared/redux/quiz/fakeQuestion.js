export default {
  title: 'Which is not in the following?',
  total: 5,
  time: '30 Minutes',
  data: [
    {
      id: 1,
      question: 'Which one is not a sports?',
      type: 'single',
      showAnswer: false,
      options: [
        {
          value: 'football',
          label: 'Football',
        },
        {
          value: 'volleyball',
          label: 'Volleyball',
        },
        {
          value: 'baseball',
          label: 'Baseball',
        },
        {
          value: 'lutuputu',
          label: 'Lutuputu',
        },
      ],
      answers: 'lutuputu',
    },
    {
      id: 2,
      type: 'single',
      question: 'Which one is not a programming language?',
      options: [
        {
          value: 'c#',
          label: 'C#',
        },
        {
          value: 'java',
          label: 'Java',
        },
        {
          value: 'php',
          label: 'PHP',
        },
        {
          value: 'reactjs',
          label: 'React.JS',
        },
      ],
      answers: 'reactjs',
    },
    {
      id: 3,
      type: 'single',
      question: 'Which is not a HTML attributes?',
      options: [
        {
          value: 'title',
          label: 'title',
        },
        {
          value: 'style',
          label: 'style',
        },
        {
          value: 'onclick',
          label: 'onclick',
        },
        {
          value: 'meta',
          label: 'meta',
        },
      ],
      answers: 'meta',
    },
    {
      id: 4,
      type: 'multiple',
      question: 'Powerful Javascript framework is?',
      options: [
        {
          value: 'laravel',
          label: 'Laravel',
        },
        {
          value: 'angular',
          label: 'Angular',
        },
        {
          value: 'symphony',
          label: 'Symphony',
        },
        {
          value: 'react',
          label: 'React',
        },
      ],
      answers: ['angular', 'react'],
    },
    {
      id: 5,
      type: 'single',
      question: 'Which is not a PHP framework?',
      options: [
        {
          value: 'symphony',
          label: 'Symphony',
        },
        {
          value: 'laravel',
          label: 'Laravel',
        },
        {
          value: 'codeigniter',
          label: 'Codeigniter',
        },
        {
          value: 'django',
          label: 'django',
        },
      ],
      answers: 'django',
    },
  ],
};
