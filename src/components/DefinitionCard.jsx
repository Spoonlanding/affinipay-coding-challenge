import React from "react";
export default function DefinitionCard({ word, entry }) {
  if (!entry) return "...";
  if (!entry.found) return entry.msg;
  console.log(entry);
  return (
    <>
      <h1>{entry.word}</h1>
      {entry.definitions.map((def, i) => (
        <>
          <h4>
            {def.type} | {def.pronunciation}
          </h4>
          {def.shortDefs.map((shortDef, i) => (
            <div>
              {i + 1}. {shortDef}
            </div>
          ))}
        </>
      ))}
    </>
  );
}
