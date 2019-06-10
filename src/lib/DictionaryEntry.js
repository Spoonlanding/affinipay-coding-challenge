export default class DictionaryEntry {
  constructor(rawDictionaryData) {
    if (this.validate(rawDictionaryData)) {
      this.word = null;
      this.definitions = [];
      this.buildEntry(rawDictionaryData);
    } else {
      this.found = false;
      this.msg = "No dictionary entry found 🤷";
    }
  }

  buildEntry(raw) {
    this.word = raw[0].hwi.hw;
    this.found = true;
    for (const data of raw) {
      if (data.hwi.hw !== this.word) continue;
      if ("cxs" in data) {
        this.buildParticipleEntry(data.cxs);
      } else {
        this.definitions.push({
          type: data.fl,
          shortDefs: data.shortdef,
          pronunciation: (data.hwi.prs && data.hwi.prs[0].mw) || undefined
        });
      }
    }
  }

  buildParticipleEntry(data) {
    const participleData = data[0].cxtis[0];
    if ("cxl" in participleData && "cxt" in participleData) {
      this.definitions.push({
        shortDefs: [participleData.cxl + " " + participleData.cxt]
      });
    } else if ("cxl" in data[0] && "cxt" in participleData) {
      this.definitions.push({
        shortDefs: [data[0].cxl + " " + participleData.cxt]
      });
    }
  }

  validate(raw) {
    return Array.isArray(raw) && raw[0] instanceof Object;
  }
}
