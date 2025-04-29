const addClassBtn = document.getElementById("addClassBtn");
const classList = document.getElementById("classList");

addClassBtn.addEventListener("click", () => {
  const className = prompt("Ingrese el nombre de la nueva clase:");
  if (className && className.trim() !== "") {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer";

    const divInfo = document.createElement("div");
    const pName = document.createElement("p");
    pName.className = "text-[18px] font-normal text-gray-900";
    pName.textContent = className.trim();

    const pStudents = document.createElement("p");
    pStudents.className = "text-[12px] text-gray-400 select-none";
    pStudents.textContent = "0 alumnos";

    divInfo.appendChild(pName);
    divInfo.appendChild(pStudents);

    const btnMore = document.createElement("button");
    btnMore.setAttribute("aria-label", `More options for ${className.trim()}`);
    btnMore.className = "text-gray-400 hover:text-gray-600 focus:outline-none";
    btnMore.innerHTML = '<i class="fas fa-ellipsis-h"></i>';

    li.appendChild(divInfo);
    li.appendChild(btnMore);

    classList.appendChild(li);
  }
});
