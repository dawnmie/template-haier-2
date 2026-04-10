module.exports = {
  ignorePatterns: ['src/styles/iconfont/iconfont.js'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // 使用推荐的eslint
    'plugin:vue/vue3-essential', // 使用插件支持vue3
    'plugin:@typescript-eslint/recommended' // TypeScript 推荐规则
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 0：禁止使用该规则
    // 1：将该规则定义为警告等级
    // 2：将该规则定义为错误等级
    'arrow-parens': 0, // 禁用箭头函数参数使用圆括号括起来
    'accessor-pairs': 2,
    'arrow-spacing': [
      2,
      {
        // 要求箭头函数的箭头前后使用一致的空格
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        // 要求在代码块中使用一致的大括号风格
        allowSingleLine: true
      }
    ],
    camelcase: [
      0,
      {
        // 要求使用骆驼拼写法命名约定
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: [2, 'multi-line'], // 要求所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'],
    'eol-last': 2,
    eqeqeq: [2, 'allow-null'], // 要求使用 === 和 !==
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'],
    indent: [
      2,
      2,
      {
        // 要求使用JS一致缩进2个空格
        SwitchCase: 1
      }
    ],
    'max-depth': ['warn', 4], // 要求可嵌套的块的最大深度4
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 2,
    'no-delete-var': 2, // 允许出现delete变量的使用
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2, // 禁止出现重复case
    'no-empty': 1, // 禁止出现空语句块
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-parens': [2, 'functions'], // 禁止不必要的括号
    'no-else-return': 2, // 禁止if语句中return语句之后有else块
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2, // 禁止对Function声明重新赋值
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2, // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': [2, false], // 禁止空格和tab的混合缩进
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multi-str': 2,
    'no-multiple-empty-lines': [
      2,
      {
        // 禁止出现多行空行
        max: 1
      }
    ],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'], // 禁止在return语句中使用赋值语句
    'no-return-await': 2, // 禁用不必要的[return/await]
    'no-self-compare': 2, // 禁止自身比较表达式
    'no-useless-return': 2, // 禁止不必要的return语句
    'no-sequences': 2,
    'no-shadow': [2, { builtinGlobals: false, hoist: 'functions' }], // 禁止内层作用域遮蔽外层变量。
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2, // 禁止一行结束后面不要有空格
    'no-undef': 2,
    'default-case': 1, // 要求switch语句中有default分支
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-useless-call': 2, // 禁止不必要的.call()和.apply()
    'no-var': 1, // 禁止出现var用let和const代替
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        // 要求统一使用单引号符号
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [0, 'never'], // 代码结尾是否加分号
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'no-self-assign': 1, // 自己赋值自己
    'space-before-blocks': [2, 'always'], // 要求在块之前使用一致的空格
    'space-in-parens': [2, 'never'], // 要求在圆括号内使用一致的空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-unary-ops': [
      2,
      {
        // 要求在一元操作符前后使用一致的空格
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 2,
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    'no-extra-boolean-cast': 0,
    'no-async-promise-executor': 0,
    'no-unused-vars': [1, { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'space-before-function-paren': 0, // 定义函数，函数名和参数之间有空格
    'array-bracket-spacing': [2, 'never'], // 要求数组方括号中使用一致的空格
    // vue 语法配置
    'vue/singleline-html-element-content-newline': 0, // 关闭单行元素必须换行符
    'vue/multiline-html-element-content-newline': 0, // 关闭多行元素必须换行符
    'vue/html-indent': [2, 2], // 要求html标签的缩进为需要4个空格
    'vue/multi-word-component-names': 0, // 组件名
    'vue/no-v-html': 1,
    'vue/max-attributes-per-line': [
      2,
      {
        // 要求每一行标签的最大属性不超五个
        singleline: 5,
        multiline: {
          max: 5
        }
      }
    ],
    'vue/component-definition-name-casing': 0,
    // 取消关闭标签不能自闭合的限制设置
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'any'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
