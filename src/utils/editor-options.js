import lang from 'suneditor/src/lang';

const options = {
  lang: lang.pt_br,
  height: 500,
  defaultStyle: 'font-family: Times New Roman; font-size: 14px;',
  font: [
    'Arial',
    'Comic Sans MS',
    'Courier New',
    'Impact',
    'Georgia',
    'tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
  ],
  buttonList: [
    // default
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike'],
    ['subscript', 'superscript', 'fontColor', 'hiliteColor'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['showBlocks', 'table', 'preview', 'fullScreen'],
    // (min-width: 992)
    [
      '%992',
      [
        ['undo', 'redo'],
        [
          ':p-More Paragraph-default.more_paragraph',
          'font',
          'fontSize',
          'formatBlock',
        ],
        ['bold', 'underline', 'italic', 'strike'],
        [
          ':t-More Text-default.more_text',
          'subscript',
          'superscript',
          'fontColor',
          'hiliteColor',
        ],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        [
          '-right',
          ':r-More Rich-default.more_plus',
          'showBlocks',
          'table',
          'preview',
          'fullScreen',
        ],
      ],
    ],
    // (min-width: 767)
    [
      '%915',
      [
        ['undo', 'redo'],
        [
          ':p-More Paragraph-default.more_paragraph',
          'font',
          'fontSize',
          'formatBlock',
        ],
        [
          ':t-More Text-default.more_text',
          'bold',
          'underline',
          'italic',
          'strike',
          'subscript',
          'superscript',
          'fontColor',
          'hiliteColor',
        ],
        ['removeFormat'],
        ['outdent', 'indent'],
        [
          ':e-More Line-default.more_horizontal',
          'align',
          'horizontalRule',
          'list',
          'lineHeight',
        ],
        [
          '-right',
          ':r-More Rich-default.more_plus',
          'showBlocks',
          'table',
          'preview',
          'fullScreen',
        ],
      ],
    ],
    // (min-width: 480)
    [
      '%660',
      [
        ['undo', 'redo'],
        [
          ':p-More Paragraph-default.more_paragraph',
          'font',
          'fontSize',
          'formatBlock',
        ],
        [
          ':t-More Text-default.more_text',
          'bold',
          'underline',
          'italic',
          'strike',
          'subscript',
          'superscript',
          'fontColor',
          'hiliteColor',
          'removeFormat',
        ],
        [
          ':e-More Line-default.more_horizontal',
          'outdent',
          'indent',
          'align',
          'horizontalRule',
          'list',
          'lineHeight',
        ],
        [
          ':r-More Rich-default.more_plus',
          'showBlocks',
          'table',
          'preview',
          'fullScreen',
        ],
      ],
    ],
  ],
};

export default options;
