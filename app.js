// app.js – UI logic for MWAD Practicals

// Utility to escape HTML when rendering code (textContent is safer but we need line numbers)
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Render the list of programs
function renderPrograms() {
  const container = document.getElementById("programs");
  container.innerHTML = "";
  PROGRAMS.forEach((prog, idx) => {
    // ---- Row button ----
    const rowBtn = document.createElement("button");
    rowBtn.className = "program-row";
    rowBtn.setAttribute("role", "button");
    rowBtn.setAttribute("aria-expanded", "false");
    rowBtn.setAttribute("aria-controls", `panel-${idx}`);
    rowBtn.id = `program-${idx}`;

    const leftDiv = document.createElement("div");
    leftDiv.className = "program-left";
    const numberSpan = document.createElement("span");
    numberSpan.className = "program-number";
    numberSpan.textContent = prog.n;
    const titleSpan = document.createElement("span");
    titleSpan.className = "program-title";
    titleSpan.textContent = prog.title;
    const chipsDiv = document.createElement("div");
    chipsDiv.className = "chips";
    prog.files.forEach(f => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = f.name;
      chipsDiv.appendChild(chip);
    });
    leftDiv.appendChild(numberSpan);
    leftDiv.appendChild(titleSpan);
    leftDiv.appendChild(chipsDiv);

    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.innerHTML = "&#9654;"; // right arrow

    rowBtn.appendChild(leftDiv);
    rowBtn.appendChild(chevron);
    container.appendChild(rowBtn);

    // ---- Accordion panel ----
    const panel = document.createElement("div");
    panel.id = `panel-${idx}`;
    panel.className = "accordion";
    panel.setAttribute("role", "region");
    panel.setAttribute("hidden", "");

    // Aim
    const aimP = document.createElement("p");
    aimP.innerHTML = `<strong>Aim:</strong> ${prog.aim}`;
    panel.appendChild(aimP);

    // Optional note
    if (prog.note && prog.note.trim() !== "") {
      const noteDiv = document.createElement("div");
      noteDiv.innerHTML = `<span style="border:1px solid var(--warn);padding:0.2rem 0.4rem;margin-right:0.4rem;font-size:0.75rem;">CHANGED</span>${prog.note}`;
      panel.appendChild(noteDiv);
    }

    // Tab bar (use button role="tab")
    const tabBar = document.createElement("div");
    tabBar.className = "tab-bar";
    prog.files.forEach((file, fIdx) => {
      const tabBtn = document.createElement("button");
      tabBtn.setAttribute("role", "tab");
      tabBtn.dataset.fileIdx = fIdx;
      tabBtn.textContent = file.name;
      if (fIdx === 0) tabBtn.setAttribute("aria-selected", "true");
      else tabBtn.setAttribute("aria-selected", "false");
      tabBar.appendChild(tabBtn);
    });
    panel.appendChild(tabBar);

    // Code container
    const codeContainer = document.createElement("div");
    codeContainer.className = "code-container";
    const codeBox = document.createElement("pre");
    codeBox.className = "code-box";
    codeContainer.appendChild(codeBox);
    panel.appendChild(codeContainer);

    // Footer with line count and UTF-8
    const footer = document.createElement("div");
    footer.className = "code-footer";
    const leftFoot = document.createElement("div");
    leftFoot.className = "line-count";
    const rightFoot = document.createElement("div");
    rightFoot.className = "utf8";
    rightFoot.textContent = "UTF-8";
    footer.appendChild(leftFoot);
    footer.appendChild(rightFoot);
    panel.appendChild(footer);

    // Copy button + feedback
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn-copy";
    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy code`;
    const feedbackSpan = document.createElement("span");
    feedbackSpan.className = "feedback";
    feedbackSpan.setAttribute("role", "status");
    feedbackSpan.setAttribute("aria-live", "polite");
    feedbackSpan.hidden = true;
    const copyWrapper = document.createElement("div");
    copyWrapper.appendChild(copyBtn);
    copyWrapper.appendChild(feedbackSpan);
    panel.appendChild(copyWrapper);

    // To run line
    const toRun = document.createElement("p");
    toRun.className = "to-run";
    panel.appendChild(toRun);

    container.appendChild(panel);

    // ---- Interaction logic ----
    // Row click toggles accordion
    rowBtn.addEventListener("click", () => {
      const expanded = rowBtn.getAttribute("aria-expanded") === "true";
      // close any open panel
      document.querySelectorAll(".program-row[aria-expanded='true']").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.classList.remove("open");
        const p = document.getElementById(btn.getAttribute("aria-controls"));
        p.setAttribute("hidden", "");
      });
      if (!expanded) {
        rowBtn.setAttribute("aria-expanded", "true");
        panel.removeAttribute("hidden");
        rowBtn.classList.add("open");
        // when opening, ensure the first file/tab is selected
        selectFile(0);
      }
    });

    // Tab click switches file
    tabBar.addEventListener("click", e => {
      if (e.target.getAttribute("role") !== "tab") return;
      const idx = Number(e.target.dataset.fileIdx);
      // update aria-selected
      tabBar.querySelectorAll("button[role='tab']").forEach(t => t.setAttribute("aria-selected", "false"));
      e.target.setAttribute("aria-selected", "true");
      selectFile(idx);
    });

    // Copy button behaviour
    copyBtn.addEventListener("click", async () => {
      const selTab = tabBar.querySelector("button[aria-selected='true']");
      const fileIdx = Number(selTab.dataset.fileIdx);
      const codeText = prog.files[fileIdx].code;
      try {
        await navigator.clipboard.writeText(codeText);
        showFeedback(`Copied ${prog.files[fileIdx].name}. Now paste it into Notepad.`);
      } catch (err) {
        // fallback textarea
        const ta = document.createElement("textarea");
        ta.value = codeText;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showFeedback(`Copied ${prog.files[fileIdx].name}. Now paste it into Notepad.`);
        } catch (e2) {
          // as last resort select code on screen
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(codeBox);
          selection.removeAllRanges();
          selection.addRange(range);
          showFeedback(`Code selected. Press Ctrl+C to copy.`);
        }
        document.body.removeChild(ta);
      }
    });

    // Helper to render selected file
    function selectFile(fileIdx) {
      const file = prog.files[fileIdx];
      const escaped = escapeHtml(file.code);
      // Insert line numbers via CSS counters – we just set the content
      const lines = file.code.split("\n");
      const numberedHtml = lines.map(l => `<span class="code-line">${escapeHtml(l)}</span>`).join("\n");
      codeBox.innerHTML = numberedHtml;
      // line count
      leftFoot.textContent = `${lines.length} lines`;
      // update to‑run text
      if (prog.files.length === 1) {
        toRun.innerHTML = `To run: paste the code into Notepad, choose File, then Save As, set "Save as type" to All files, and name it <strong>${file.name}</strong>. Then double‑click the saved file to run it in your browser.`;
      } else {
        toRun.innerHTML = `To run: copy one file, paste it into Notepad, choose File, then Save As, and set "Save as type" to All files. Save <strong>index.html</strong> and <strong>styles.css</strong> in the same folder (use the tabs to switch files). Then double‑click <strong>index.html</strong> to run it.`;
      }
    }

    function showFeedback(msg) {
      feedbackSpan.textContent = msg;
      feedbackSpan.hidden = false;
      setTimeout(() => { feedbackSpan.hidden = true; }, 3000);
    }

    // If this is the first program, open it on load
    if (idx === 0) {
      rowBtn.click();
    }
  });
}

// Initialise
document.addEventListener("DOMContentLoaded", renderPrograms);
