import React from "react";
import ReactTooltip from "react-tooltip";

import { getDictionaryEntry } from "./api";
import ipsumString from "./ipsum";
import "./App.scss";
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
    let definitions = this.state.definitions;
    if (!!definitions[word]) return definitions[word];
    const dictionaryEntry = await getDictionaryEntry(word);
    definitions[word] = dictionaryEntry;
    this.setState({ definitions });
  }

  render() {
    const { definitions: defs, ipsumString } = this.state;
    const words = ipsumString.split(" ");
    const githubUrl =
      "https://github.com/Spoonlanding/affinipay-coding-challenge";

    return (
      <div className="App">
        <h1 id="pageHeader">Affinipay Coding Challenge</h1>
        <h2 id="subHeader">
          Submission by Spencer Mitchell |{" "}
          <a href={githubUrl}>View on GitHub</a>
        </h2>
        <div id="words">
          {words.map(word => [
            <a
              href="#" // !! accessibility problem, letting it slide since this is just a demo
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
          multiline={true}
          getContent={word => <DefinitionCard entry={defs[word]} />}
        />
      </div>
    );
  }
}

export default App;
