import Component from '@ember/component';
import faker from 'faker';
import layout from '../templates/components/weather';

const cities = [
  { name: 'Berlin', flag: '🇩🇪'},
  { name: 'Cuba', flag: '🇨🇺'},
  { name: 'Edmonton', flag: '🇨🇦'},
  { name: 'Portland', flag: '🇺🇸'},
  { name: 'Brooklyn', flag: '🇺🇸'},
  { name: 'Copenhagen', flag: '🇩🇰'},
  { name: 'San Francisco', flag: '🇺🇸'},
  { name: 'Los Angeles', flag: '🇺🇸'},
  { name: 'Tokyo', flag: '🇯🇵'},
  { name: 'London', flag: '󠁧󠁢󠁥󠁮󠁧󠁿🇬🇧'},
  { name: 'Paris', flag: '󠁧󠁢󠁥󠁮󠁧󠁿🇫🇷'},
  { name: 'New Delhi', flag: '󠁧󠁢󠁥󠁮󠁧󠁿🇮🇳'},
  { name: 'Bangkok', flag: '󠁧󠁢󠁥󠁮󠁧󠁿🇹🇭'},
  { name: 'Cape Town', flag: '󠁧󠁢󠁥󠁮󠁧󠁿🇿🇦'},
  { name: 'Toronto', flag: '🇨🇦'},
  { name: 'Ottawa', flag: '🇨🇦'},
];

const coldWeather = [
  { label: 'snowy', icon: '☃️' },
  { label: 'windy', icon: '🌬' },
  { label: 'rainy', icon: '☔️' }
];

const hotWeather = [
  { label: "sunny", icon: "🌞️" },
  { label: "cloudy", icon: "🌤" },
  { label: "rainy", icon: "☔️" },
  { label: "lightning-y", icon: "⛈" },
];

const COLD_THRESHOLD = 0;

export default Component.extend({
  layout,

  tagName: '',

  fontSize: 16,
  city: null,
  temp: '',
  weather: '',
  isCold: false,

  init() {
    this._super(...arguments);

    const city = faker.random.arrayElement(cities);
    this.set('city', city);
    // remove city from the array so it's not reused
    cities.splice(cities.indexOf(city), 1);

    this.set('temp', faker.random.number({min: -20, max: 35}));

    if (this.temp > COLD_THRESHOLD) {
      this.set('weather', faker.random.arrayElement(hotWeather));
      this.set('isCold', false);
    } else {
      this.set('weather', faker.random.arrayElement(coldWeather));
      this.set('isCold', true);
    }
  },

  actions: {
    onChange({width}) {
      const fontSize = Math.min(Number(width) / 12, 65);
      this.set("fontSize", fontSize);
    }
  }
});
