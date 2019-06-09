import React from "react";
export default function DefinitionCard({ entry }) {
  if (!entry) return "...";
  if (!entry.found) return entry.msg;
  return (
    <>
      <h1>{entry.word}</h1>
      {entry.definitions.map((def, i) => (
        <div key={`${entry.word}-def-${i}`}>
          <h4>
            {def.type}
            {def.pronunciation && ` | ${def.pronunciation}`}
          </h4>
          {def.shortDefs.map((shortDef, i) => (
            <div key={`${entry.word}-shortDef-${i}`}>
              {i + 1}. {shortDef}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
