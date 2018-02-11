import indexContent from '../index.html';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import './js/jquery-3.2.1.slim.min.js';
import './js/popper.min.js';
import './js/bootstrap.min.js';
import './css/bootstrap.min.css';

OfflinePluginRuntime.install();
document.getElementsByTagName('body')[0].innerHTML = indexContent;
