export default class DogsService {
    constructor() {
        this.duplicates = {};
    }

    // PRIVATE FUNCTIONS
    _filterDuplicates = (dog) => {
        if (this.duplicates[dog]) {
            return false
        }
        this.duplicates[dog] = true;
        return true;
    };

    async _get(url) {
        const res = await fetch(url);
        const json = await res.json();
        return json.message
          .filter(this._filterDuplicates)
          .map(img => ({ breed: img.match(/breeds\/(.*)\//)[1], src: img }))
    }

    // PUBLIC FUNCTIONS
    async getMoreDogs() {
        return await this._get('https://dog.ceo/api/breed/pug/images/random/10');
    }

    async getMorePuggles() {
        return await this._get('https://dog.ceo/api/breed/puggle/images/random/5');
    }
}
