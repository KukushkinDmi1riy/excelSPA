import {Excel} from './components/excel/excel';
import './scss/index.scss';

import {Formula} from './components/formula/Formula';
import {Toolbar} from './components/toolbar/Toolbar';
import {Header} from './components/header/header';
import {Table} from './components/table/Table';


const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render()
