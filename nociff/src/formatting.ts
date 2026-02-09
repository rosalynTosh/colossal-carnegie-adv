export interface FormatStringPart {
    type: "output" | "fault" | "dbg";
    str: string;
}

export type FormatString = FormatStringPart[];

type CurrNode = { type: "output", node: Text } | { type: "fault", node: HTMLSpanElement } | { type: "dbg", node: HTMLSpanElement };

export function formatStringToHTML(formatString: FormatString): Node {
    if (formatString.length == 0) {
        return document.createTextNode("");
    }

    const pastNodes = [];
    let currNode: CurrNode;

    switch (formatString[0].type) {
        case "output": {
            currNode = {
                type: "output",
                node: document.createTextNode(formatString[0].str)
            };

            break;
        }
        case "fault": {
            const span = document.createElement("span");
            span.classList.add("fault");
            span.textContent = formatString[0].str;

            currNode = {
                type: "fault",
                node: span
            };

            break;
        }
        case "dbg": {
            const span = document.createElement("span");
            span.classList.add("dbg");
            span.textContent = formatString[0].str;

            currNode = {
                type: "dbg",
                node: span
            };

            break;
        }
    }

    for (let i = 1; i < formatString.length; i++) {
        const part = formatString[i];

        switch (part.type) {
            case "output": {
                if (currNode.type == "output") {
                    currNode.node.textContent += part.str;
                } else {
                    pastNodes.push(currNode);
                    currNode = {
                        type: "output",
                        node: document.createTextNode(part.str)
                    };
                }

                break;
            }
            case "fault": {
                if (currNode.type == "fault") {
                    currNode.node.textContent += part.str;
                } else {
                    const span = document.createElement("span");
                    span.classList.add("fault");
                    span.textContent = part.str;

                    pastNodes.push(currNode);
                    currNode = {
                        type: "fault",
                        node: span
                    };
                }

                break;
            }
            case "dbg": {
                if (currNode.type == "dbg") {
                    currNode.node.textContent += part.str;
                } else {
                    const span = document.createElement("span");
                    span.classList.add("dbg");
                    span.textContent = part.str;

                    pastNodes.push(currNode);
                    currNode = {
                        type: "dbg",
                        node: span
                    };
                }

                break;
            }
        }
    }

    pastNodes.push(currNode);

    if (pastNodes.length == 1) {
        return pastNodes[0].node;
    }

    const span = document.createElement("span");

    for (const { node } of pastNodes) {
        span.appendChild(node);
    }

    return span;
}