import List from '../components/List/List';
import NewsFeed from '../components/NewsFeed/NewsFeed.js';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import StickyNotes from '../components/StickyNotes/StickyNotes';
import Modal from '../components/Modal/Modal';
import LatLong from '../components/LatLong/LatLong';
import DefaultModule from '../components/DefaultModule/DefaultModule'

var moduleList = {
  'List': List,
  'NewsFeed': NewsFeed,
  'Weather': WeatherDetails,
  'StickyNotes': StickyNotes,
  'LatLong': LatLong,

};

export default moduleList;