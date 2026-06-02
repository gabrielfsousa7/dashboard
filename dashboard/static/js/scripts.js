document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarClose = document.querySelector('.sidebar-close');
  const mainContent = document.querySelector('.main-content');

  menuToggle.addEventListener('click', function() {
    sidebar.classList.add('active');
    mainContent.classList.add('expanded');
  });

  sidebarClose.addEventListener('click', function() {
    sidebar.classList.remove('active');
    mainContent.classList.remove('expanded');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      mainContent.classList.remove('expanded');
    }
  });

   // Form validation + adicionar metas
const form = document.getElementById('goalsForm');
const goalsTableBody = document.getElementById('goalsTableBody');
const activeGoalsCount = document.getElementById('activeGoalsCount');

if (form) {

  let goalCount = goalsTableBody.rows.length;
  function updateGoalsCount() {
  const totalGoals = goalsTableBody.rows.length;
  activeGoalsCount.textContent = `${totalGoals} metas ativas`;
}

  form.addEventListener('submit', function(event) {

    event.preventDefault();

    // Verifica validação Bootstrap
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Pegando valores
    const goalName = document.getElementById('goalName').value.trim();
    const goalTarget = document.getElementById('goalTarget').value;

    // Incrementa contador
    goalCount++;

    // Criando nova linha
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <th scope="row">${goalCount}</th>
      <td>${goalName}</td>
      <td>
        R$ ${parseFloat(goalTarget).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </td>
      <td>
        <div class="progress">
          <div class="progress-bar bg-success" style="width: 0%">
            0%
          </div>
        </div>
      </td>
    `;

    // Adiciona na tabela
    goalsTableBody.appendChild(newRow);
    updateGoalsCount(); 

    // Limpa formulário
    form.reset();

    // Remove estado de validação
    form.classList.remove('was-validated');

  }, false);
}

  // Task completion
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#6c757d';
      } else {
        label.style.textDecoration = 'none';
        label.style.color = '';
      }
    });
  });
});