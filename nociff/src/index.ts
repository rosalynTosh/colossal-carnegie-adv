import { DOORS } from "./doors";
import { formatStringToHTML } from "./formatting";
import { Player } from "./player";
import { ROOMS } from "./rooms";
import { World } from "./world";

const world = new World(ROOMS, DOORS, ROOMS.find(r => r.id == "mall")!); // later: change this to warner 6
const player = new Player(world, world.findRoom("mall")!);

const history = document.getElementById("history") as HTMLDivElement;
const inputCont = document.getElementById("input-cont") as HTMLSpanElement;
const input0 = document.getElementById("input-0") as HTMLSpanElement;
const input1 = document.getElementById("input-1") as HTMLSpanElement;
const inputccont = document.getElementById("input-c-cont") as HTMLSpanElement;
const inputc = document.getElementById("input-c") as HTMLSpanElement;
const cursor = document.getElementById("cursor") as HTMLDivElement;
const input2 = document.getElementById("input-2") as HTMLSpanElement;

const input = document.getElementById("input") as HTMLInputElement;

history.appendChild(formatStringToHTML(player.initialPrintout()));

input.focus();

let initialInput: string = "";
let inputHistory: string[] = [];
let inputHistoryIndex: number | null = null;

let blinkState = 0;
let blinkInterval: ReturnType<typeof setInterval> | undefined;

function updateBlink() {
    cursor.style.display = blinkState % 4 < 2 ? "" : "none";
    blinkState++;
}

function updatePromptInput() {
    if (document.activeElement == input) {
        if (input.selectionStart == input.selectionEnd) {
            const selectionIndex = input.selectionStart === null ? input.value.length : input.selectionStart;

            input0.textContent = input.value.slice(0, selectionIndex);
            input1.textContent = "";
            inputccont.style.display = "";
            inputc.textContent = selectionIndex >= input.value.length ? "" : input.value.slice(selectionIndex, selectionIndex + 1);
            input2.textContent = input.value.slice(selectionIndex + 1);

            if (blinkInterval !== undefined) {
                clearInterval(blinkInterval);
            }
            
            blinkState = 0;
            blinkInterval = setInterval(updateBlink, 125);
            updateBlink();
        } else {
            input0.textContent = input.value.slice(0, input.selectionStart!);
            input1.textContent = input.value.slice(input.selectionStart!, input.selectionEnd!);
            inputccont.style.display = "none";
            input2.textContent = input.value.slice(input.selectionEnd!);
        }
    }
}

updatePromptInput();

function computeSelectionIndex(node: Node, nodeSelectionIndex: number): number {
    if (node == inputCont) return nodeSelectionIndex;

    let parentSelectionIndex = nodeSelectionIndex;

    for (const sibling of node.parentNode!.childNodes) {
        if (sibling == node) break;

        parentSelectionIndex += sibling.textContent!.length;
    }

    return computeSelectionIndex(node.parentNode!, parentSelectionIndex);
}

window.addEventListener("click", () => {
    const selection = window.getSelection()!;

    if (selection.isCollapsed) {
        if (inputCont.contains(selection.focusNode)) {
            const selectionIndex = computeSelectionIndex(selection.focusNode!, selection.focusOffset);

            input.focus();
            input.setSelectionRange(selectionIndex, selectionIndex);
        } else {
            input.focus();
        }
    } else {
        if (inputCont.contains(selection.anchorNode) && inputCont.contains(selection.focusNode)) {
            const anchorIndex = computeSelectionIndex(selection.anchorNode!, selection.anchorOffset);
            const focusIndex = computeSelectionIndex(selection.focusNode!, selection.focusOffset);

            input.focus();
            input.setSelectionRange(Math.min(anchorIndex, focusIndex), Math.max(anchorIndex, focusIndex));
        }
    }
});

input.addEventListener("input", () => {
    updatePromptInput();
});

input.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;

        const output = player.runUserInput(input.value);
        history.appendChild(document.createTextNode("\n\n>" + input.value));
        
        history.appendChild(formatStringToHTML([{ type: "output", str: "\n" }, ...output]));

        if (input.value != "" && (inputHistory.length == 0 || inputHistory[inputHistory.length - 1] != input.value.trim())) {
            inputHistory.push(input.value.trim());
        }

        inputHistoryIndex = null;

        input.value = "";
        updatePromptInput();

        window.scrollTo(0, document.body.scrollHeight);
    } else if (event.code == "ArrowUp") {
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;

        if (inputHistoryIndex === null) {
            if (inputHistory.length != 0) {
                initialInput = input.value;
                input.value = inputHistory.length == 0 ? "" : inputHistory[inputHistory.length - 1];
                updatePromptInput();
                inputHistoryIndex = inputHistory.length - 1;

                event.preventDefault();
            }
        } else if (inputHistoryIndex > 0) {
            input.value = inputHistory[--inputHistoryIndex];
            updatePromptInput();

            event.preventDefault();
        }
    } else if (event.code == "ArrowDown") {
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;

        if (inputHistoryIndex !== null) {
            if (inputHistoryIndex == inputHistory.length - 1) {
                input.value = initialInput;
                updatePromptInput();
                inputHistoryIndex = null;

                event.preventDefault();
            } else {
                input.value = inputHistory[++inputHistoryIndex];
                updatePromptInput();

                event.preventDefault();
            }
        }
    }
});

input.addEventListener("blur", () => {
    cursor.style.display = "none";
    clearInterval(blinkInterval);
    blinkInterval = undefined;
});

document.addEventListener("selectionchange", () => {
    updatePromptInput();
});