document.addEventListener('DOMContentLoaded', () => {
  const addClassBtn = document.getElementById('addClassBtn');
  const classList = document.getElementById('classList');

  function createClassElement(name, alumnos = 0) {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer';

    const nameContainer = document.createElement('div');
    const nameP = document.createElement('p');
    nameP.className = 'text-[18px] font-normal text-gray-900';
    nameP.textContent = name;

    const alumnosP = document.createElement('p');
    alumnosP.className = 'text-[12px] text-gray-400 select-none';
    alumnosP.textContent = `${alumnos} alumno${alumnos !== 1 ? 's' : ''}`;

    nameContainer.appendChild(nameP);
    nameContainer.appendChild(alumnosP);

    const btn = document.createElement('button');
    btn.className = 'text-gray-400 hover:text-gray-600 focus:outline-none';
    btn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showOptions(li, nameP);
    });

    li.appendChild(nameContainer);
    li.appendChild(btn);
    return li;
  }

  function showOptions(li, nameEl) {
    const options = document.createElement('div');
    options.className = 'absolute z-50 bg-white border border-gray-200 rounded shadow-md text-sm';
    options.innerHTML = `
      <button class="block px-4 py-2 hover:bg-gray-100 w-full text-left edit-btn">Editar</button>
      <button class="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500 delete-btn">Eliminar</button>
    `;

    document.body.appendChild(options);
    const rect = li.getBoundingClientRect();
    options.style.top = `${rect.top + window.scrollY + 40}px`;
    options.style.left = `${rect.left + window.scrollX + 30}px`;

    const removeOptions = () => {
      options.remove();
      document.removeEventListener('click', removeOptions);
    };

    setTimeout(() => {
      document.addEventListener('click', removeOptions);
    }, 0);

    options.querySelector('.edit-btn').addEventListener('click', () => {
      const newName = prompt('Nuevo nombre de clase:', nameEl.textContent);
      if (newName) nameEl.textContent = newName;
      options.remove();
    });

    options.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm('¿Eliminar esta clase?')) li.remove();
      options.remove();
    });
  }

  addClassBtn.addEventListener('click', () => {
    const className = prompt('Nombre de la nueva clase:');
    if (className) {
      const newClass = createClassElement(className, 0);
      classList.appendChild(newClass);
    }
  });

  // Activar los botones de opciones en las clases iniciales
  const existingBtns = classList.querySelectorAll('button');
  existingBtns.forEach(btn => {
    const nameEl = btn.parentElement.querySelector('p');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showOptions(btn.parentElement, nameEl);
    });
  });
});
