// SIGAx Portal - Dynamic Schedule & Interactions
document.addEventListener('DOMContentLoaded', function () {

    // ===== Sidebar Toggle =====
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Nav item click
    const navItems = document.querySelectorAll('.nav-item:not(.nav-divider)');
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            navItems.forEach(function (i) { i.classList.remove('active'); });
            item.classList.add('active');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    });

    // ===== IRA Toggle =====
    const iraEyeBtn = document.querySelector('.eye-btn.small');
    const iraValue = document.querySelector('.ira-hidden');
    let iraVisible = false;

    if (iraEyeBtn) {
        iraEyeBtn.addEventListener('click', function () {
            iraVisible = !iraVisible;
            if (iraVisible) {
                iraValue.textContent = '87,45';
                iraEyeBtn.querySelector('.material-icons-outlined').textContent = 'visibility_off';
            } else {
                iraValue.textContent = '••,••';
                iraEyeBtn.querySelector('.material-icons-outlined').textContent = 'visibility';
            }
        });
    }

    // ===== Saldo Toggle =====
    const saldoEyeBtn = document.querySelector('.ru-saldo .eye-btn');
    const saldoValor = document.querySelector('.saldo-valor');
    let saldoVisible = true;

    if (saldoEyeBtn) {
        saldoEyeBtn.addEventListener('click', function () {
            saldoVisible = !saldoVisible;
            if (saldoVisible) {
                saldoValor.textContent = 'R$ 0,00';
                saldoEyeBtn.querySelector('.material-icons-outlined').textContent = 'visibility_off';
            } else {
                saldoValor.textContent = 'R$ ••••';
                saldoEyeBtn.querySelector('.material-icons-outlined').textContent = 'visibility';
            }
        });
    }

    // ===== Responsive Sidebar =====
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // ===============================================
    // ===== DYNAMIC SCHEDULE BY DAY OF THE WEEK =====
    // ===============================================

    // Weekly schedule for Medicina course
    // 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
    var weeklySchedule = {
        0: [], // Domingo - sem aulas
        1: [   // Segunda-feira
            { time: '08:00 - 10:00', code: 'MED293GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '10:00 - 12:00', code: 'MED281GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '13:00 - 15:00', code: 'CBV036GVA', local: 'PITÁGORAS' },
            { time: '16:00 - 18:00', code: 'MED295GVA', local: 'PITÁGORAS' },
        ],
        2: [   // Terça-feira
            { time: '08:00 - 10:00', code: 'MED272GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '13:00 - 15:00', code: 'MED281GVA', local: 'PITÁGORAS' },
            { time: '16:00 - 18:00', code: 'CBV036GVA', local: 'PITÁGORAS' },
        ],
        3: [   // Quarta-feira
            { time: '08:00 - 09:00', code: 'MED272GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '09:00 - 12:00', code: 'MES272GVA', local: 'PITÁGORAS' },
            { time: '13:00 - 18:00', code: 'MES268GVA', local: 'EXTRA-MURO' },
            { time: '19:00 - 20:00', code: 'MED271GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '20:00 - 21:00', code: 'MES271GVA', local: 'Sala 1 - Unidade São Pedro' },
        ],
        4: [   // Quinta-feira
            { time: '08:00 - 10:00', code: 'MED293GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '10:00 - 12:00', code: 'MES268GVA', local: 'Sala 2 - Unidade São Pedro' },
            { time: '14:00 - 16:00', code: 'CBV036GVA', local: 'PITÁGORAS' },
            { time: '16:00 - 18:00', code: 'MED295GVA', local: 'Sala 1 - Unidade São Pedro' },
        ],
        5: [   // Sexta-feira
            { time: '08:00 - 10:00', code: 'MED293GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '10:00 - 12:00', code: 'CBV036GVA', local: 'Sala 1 - Unidade São Pedro' },
            { time: '13:00 - 15:00', code: 'MED295GVA', local: 'PITÁGORAS' },
        ],
        6: [   // Sábado
            { time: '08:00 - 12:00', code: 'MED281GVA', local: 'EXTRA-MURO' },
        ],
    };

    /**
     * Build HTML for a schedule section (Hoje or Amanhã)
     * Layout matches original SIGAx: time on left, flat colored band on right
     */
    function buildScheduleSection(title, classes, colorClass) {
        var html = '<h3 class="horarios-subtitle">' + title + '</h3>';

        if (classes.length === 0) {
            html += '<div class="no-classes-msg">Sem aulas programadas</div>';
            return html;
        }

        for (var i = 0; i < classes.length; i++) {
            var cls = classes[i];
            html += '<div class="horario-item">';
            html += '  <span class="horario-time">' + cls.time + '</span>';
            html += '  <div class="horario-band ' + colorClass + '">';
            html += '    <div class="horario-code-line">';
            html += '      <span class="horario-code">' + cls.code + '</span>';
            html += '      <span class="horario-local">' + cls.local + '</span>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        }

        return html;
    }

    /**
     * Generate the full Horários content based on current date
     */
    function generateSchedule() {
        var now = new Date();
        var todayIndex = now.getDay();             // 0-6
        var tomorrowIndex = (todayIndex + 1) % 7;  // next day, wraps Sun

        var todayClasses = weeklySchedule[todayIndex] || [];
        var tomorrowClasses = weeklySchedule[tomorrowIndex] || [];

        var html = '';

        // Hoje section (RED/PINK bands)
        html += buildScheduleSection('Hoje', todayClasses, 'today-color');

        // Amanhã section (PURPLE/LAVENDER bands)
        html += buildScheduleSection('Amanhã', tomorrowClasses, 'tomorrow-color');

        var container = document.getElementById('horarios-container');
        if (container) {
            container.innerHTML = html;
        }
    }

    // Generate schedule on load
    generateSchedule();

});
