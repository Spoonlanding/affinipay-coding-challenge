import React from "react";
import ReactTooltip from "react-tooltip";

import "./App.scss";
import { getDictionaryEntry } from "./lib/api";
import ipsumString from "./lib/ipsum";
import DefinitionCard from "./components/DefinitionCard";

class App extends React.Component {
  state = {
    ipsumString,
    definitions: {}
  };

  handleClick = async e => {
    ReactTooltip.hide();
    ReactTooltip.show(e.target);
    await this.getDefinition(e.target.getAttribute("data-tip"));
    ReactTooltip.rebuild();
  };

  async getDefinition(word) {
    const { definitions } = this.state;
    if (word in definitions) return definitions[word];
    const dictionaryEntry = await getDictionaryEntry(word);
    definitions[word] = dictionaryEntry;
    this.setState({ definitions });
  }

  render() {
    const { definitions: defs, ipsumString } = this.state;
    const words = ipsumString.split(" ");
    const githubUrl =
      "https://github.com/Spoonlanding/affinipay-coding-challenge";
    const linkedInUrl = "https://www.linkedin.com/in/spoonlanding/";
    return (
      <div className="App">
        <h1 id="pageHeader">Affinipay Coding Challenge</h1>
        <h3 id="subHeader">
          Submission by <a href={linkedInUrl}>Spencer Mitchell</a> |{" "}
          <a href={githubUrl}>View on GitHub</a>
        </h3>
        <div id="words">
          {words.map(word => [
            <a
              href="javascript:void(0);" // wouldn't want to do this in a prod application
              className="definition-link"
              data-for="dictionaryTooltip"
              data-event="focus"
              onClick={this.handleClick}
              data-tip={word}
              key={word}
            >
              {word}
            </a>,
            "  "
          ])}
        </div>
        <ReactTooltip
          id="dictionaryTooltip"
          effect="solid"
          place="bottom"
          getContent={word => <DefinitionCard entry={defs[word]} />}
        />
      </div>
    );
  }
}

export default App;
