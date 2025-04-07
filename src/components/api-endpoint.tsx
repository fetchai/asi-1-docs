'use client'
import React, { ReactNode, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { CodeBlock as Codegroup } from "./code";
import { ApiIntro, Properties, Property, Row } from "./mdx";
interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre className="no-ring">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

interface PropertyType {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  nestedChildren?: { name: string; type: string; required?: boolean; description: ReactNode }[];
}

const CurlCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
  isBearerTokenRequired?: boolean;
}> = ({ method, url, samplePayload, isBearerTokenRequired }) => {
  const escapedPayload = samplePayload ? JSON.stringify(samplePayload, null, 2) : "";
  let code = `curl -X ${method}`;

  if (isBearerTokenRequired) {
    code += ` \\\n  -H "Authorization: bearer <your token here>" -H "Content-Type: application/json"`;
  }
  code += ` \\\n  "${url}"`;

  if (samplePayload) {
    code += ` \\\n  -d '${escapedPayload}'`;
  }

  return <CodeBlock code={code} language="bash" />;
};

const PythonCodeTab: React.FC<{
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url?: string;
  samplePayload?: unknown;
  pathParameters?: Record<string, string>;
}> = ({ method, url, samplePayload, pathParameters }) => {
  let actualUrl = url;
  if (pathParameters) {
    for (const param in pathParameters) {
      // e.g. replace /v1/users/{id} with /v1/users/{pathParameters.id}
      actualUrl = actualUrl.replace(`{${param}}`, `{pathParameters.${param}}`);
    }
  }

  let code = "";

  if (samplePayload) {
    code = `import requests

data = ${JSON.stringify(samplePayload, null, 4)}

${pathParameters
        ? `pathParameters = ${JSON.stringify(pathParameters, null, 4)}\n\n`
        : ``
      }requests.${method.toLowerCase()}("${actualUrl}", json=data, headers={
    "Authorization": "bearer <your token here>"
})`;
  } else {
    code = `import requests

${pathParameters
        ? `pathParameters = ${JSON.stringify(pathParameters, null, 4)}\n\n`
        : ``
      }requests.${method.toLowerCase()}("${actualUrl}", headers={
    "Authorization": "bearer <your token here>"
})`;
  }

  return <CodeBlock code={code} language="python" />;
};

const JavascriptCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
  pathParameters?: Record<string, string>;
}> = ({ method, url, samplePayload, pathParameters }) => {
  let actualUrl = url;
  if (pathParameters) {
    for (const param in pathParameters) {
      actualUrl = actualUrl.replace(`{${param}}`, `{pathParameters.${param}}`);
    }
  }

  let code = "";

  if (samplePayload) {
    code = `\
const body = ${JSON.stringify(samplePayload, null, 4)};
${pathParameters
        ? `const pathParameters = ${JSON.stringify(pathParameters, null, 4)};\n`
        : ``
      }
await fetch("${actualUrl}", {
  method: "${method}",
  headers: {
    "Authorization": "Bearer <your token here>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});`;
  } else {
    code = `\
${pathParameters
        ? `const pathParameters = ${JSON.stringify(pathParameters, null, 4)};\n`
        : ``
      }
await fetch("${actualUrl}", {
  method: "${method}",
  headers: {
    "Authorization": "Bearer <your token here>"
  }
});`;
  }

  return <CodeBlock code={code} language="javascript" />;
};

const JsonCodeTab: React.FC<{
  samplePayload: unknown;
}> = ({ samplePayload }) => {
  const formattedJson = JSON.stringify(samplePayload, null, 2);
  return <CodeBlock code={formattedJson} language="json" />;
};

export const ApiRequestResponseCombined: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: unknown;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
  isBearerTokenRequired?: boolean;
  responseDescription?: string;
  responses: unknown;
  responseProperties?: PropertyType[];
}> = (props) => {
  const {
    apiUrl,
    method,
    path,
    description,
    samplePayload,
    properties,
    pathParameters,
    isBearerTokenRequired,
    responseDescription,
    responses,
    responseProperties
  } = props;

  return (
    <div className="flex flex-col justify-between gap-6 xl:flex-row col-container height-adjust">
      {/* Left column: request + response doc */}
      <div className="w-1/2">
        <Row>
          <div className="flex text-base">
            <div className="items-center mb-4 code">
              <span className="mr-2">{method}</span>
            </div>
            <span className="font-normal dark:text-indigo-250">{path}</span>
          </div>
        </Row>

        <div className="flex flex-col gap-12 w-[100%]">
          {/* Request */}
          <div>
            <h1 className="text-2xl tracking-tight text-slate-900 dark:text-white-90">
              Request
            </h1>
            {description && <ApiIntro>{description}</ApiIntro>}
            {properties && properties.length > 0 && (
              <Properties>
                {properties.map((property) => (
                  <Property
                    key={property.name}
                    name={property.name}
                    required={property.required}
                    type={property.type}
                    nestedChildren={property.nestedChildren}
                  >
                    {property.description}
                  </Property>
                ))}
              </Properties>
            )}
          </div>

          {/* Response */}
          <div>
            <h1 className="text-2xl tracking-tight text-slate-900 dark:text-white-90">
              Responses
            </h1>
            <div className="gap-8 pt-4">
              {responseDescription && <ApiIntro>{responseDescription}</ApiIntro>}
              {responseProperties && responseProperties.length > 0 && (
                <Properties>
                  {responseProperties.map((property) => (
                    <Property
                      key={property.name}
                      name={property.name}
                      required={property.required}
                      type={property.type}
                    >
                      {property.description}
                    </Property>
                  ))}
                </Properties>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 blocks-margin sticky top-24 self-start w-1/2 xl:w-[50%]">
        <Codegroup
          hasCopy={true}
          codeBlocks={[
            {
              filename: "Curl",
              component: (
                <CurlCodeTab
                  method={props.method}
                  url={props.apiUrl + props.path}
                  samplePayload={props.samplePayload}
                  isBearerTokenRequired={props.isBearerTokenRequired}
                />
              ),
            },
            {
              filename: "Python",
              component: (
                <PythonCodeTab
                  method={props.method}
                  url={props.apiUrl + props.path}
                  samplePayload={props.samplePayload}
                  pathParameters={props.pathParameters}
                />
              ),
            },
            {
              filename: "JavaScript",
              component: (
                <JavascriptCodeTab
                  method={props.method}
                  url={props.apiUrl + props.path}
                  samplePayload={props.samplePayload}
                  pathParameters={props.pathParameters}
                />
              ),
            },
          ]}
        />
        <Codegroup
          hasCopy={true}
          codeBlocks={[
            {
              filename: "HTTP 200",
              component: <JsonCodeTab samplePayload={props.responses} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

type SamplePayload = {
  code?: unknown;
  [key: string]: unknown;
};

export const ApiEndpointRequestResponse: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: SamplePayload;
  responses?: unknown;
  responseProperties?: PropertyType[];
  responseDescription?: string;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
  isBearerTokenRequired?: boolean;
}> = ({
  isBearerTokenRequired = true,
  ...properties
}) => {
    return (
      <ApiRequestResponseCombined
        apiUrl={properties.apiUrl}
        method={properties.method}
        path={properties.path}
        description={properties.description}
        samplePayload={properties.samplePayload}
        properties={properties.properties}
        pathParameters={properties.pathParameters}
        isBearerTokenRequired={isBearerTokenRequired}
        responses={properties.responses}
        responseProperties={properties.responseProperties}
        responseDescription={properties.responseDescription}
      />
    );
  };