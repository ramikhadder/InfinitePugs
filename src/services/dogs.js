export default class DogsService {
    constructor() {
        this.duplicates = {};
    }

    _filterDuplicates = (dog) => {
        if (this.duplicates[dog]) {
            return false
        }
        this.duplicates[dog] = true;
        return true;
    };

    async getMoreDogs() {
        const res = await fetch('https://dog.ceo/api/breed/pug/images/random/10');
        const json = await res.json();
        return json.message
          .filter(this._filterDuplicates)
          .map(img => ({ breed: img.match(/breeds\/(.*)\//)[1], src: img }))
    }
}
