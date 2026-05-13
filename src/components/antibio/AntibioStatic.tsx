/* 8 static reference views — no interactive state */

export function ImagineTool() {
  const rows = [
    { letter: 'I', title: 'Infeção bacteriana?', body: 'Está perante uma infeção bacteriana confirmada ou fortemente suspeita? Não uma infeção viral, colonização ou outra causa de febre.' },
    { letter: 'M', title: 'Microbiologia', body: 'Verificou a história microbiológica recente? Quando indicado, solicitou estudos adequados (urocultura, exsudados, hemoculturas)?' },
    { letter: 'A', title: 'Antibioterapia prévia', body: 'ATB nos últimos 30–90 dias pode alterar o espectro esperado e obrigar a cobertura mais alargada ou de segunda linha.' },
    { letter: 'G', title: 'Guias terapêuticos', body: 'Teve em conta normas DGS, guidelines, classificação AWaRe OMS e este Guia de Bolso?' },
    { letter: 'I', title: 'Individuais — características do doente', body: 'Insuficiências orgânicas · gravidez/aleitamento · alergias · interações · comorbilidades · idades extremas?' },
    { letter: 'N', title: 'Notas clínicas', body: 'Registou a razão para antibioterapia e o código ICPC-2 no sistema informático?' },
    { letter: 'E', title: 'Ecologia — impacto ambiental', body: 'Preferiu antibióticos Access? Usou a duração mínima eficaz para o contexto clínico?' },
  ];
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">🧠</span>
        <div className="atb-detail-title">Mnemónica IMAGINE</div>
        <div className="atb-detail-meta">ECDC 2017 · Classificação AWaRe OMS · Guia de Bolso PAPA ARS LVT Ed. 1.3</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-blue">Checklist antes de prescrever</span>
          <span className="atb-tag atb-tag-green">Prescrição apropriada e racional</span>
        </div>
      </div>
      <div className="atb-alert atb-alert-info">
        <span className="atb-alert-icon">ℹ</span>
        <div><strong>O que é a prescrição apropriada?</strong> Resulta da integração de elementos clínicos, laboratoriais e microbiológicos. Em sépsis ou choque séptico, a referenciação rápida e o início imediato de ATB são prioritários sobre qualquer checklist.</div>
      </div>
      <div className="atb-imagine-grid">
        {rows.map((r, i) => (
          <div key={i} className="atb-imagine-row">
            <div className="atb-imagine-letter">{r.letter}</div>
            <div className="atb-imagine-content"><strong>{r.title}</strong><p>{r.body}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}

export function AlarmeTool() {
  const cards = [
    { name: 'Neurológico / Sistémico', body: 'Cefaleia intensa · alteração do estado de consciência · vómitos · fotofobia · prostração marcada · petéquias/púrpura' },
    { name: 'ORL / Cabeça e pescoço', body: 'Odinofagia grave · odontalgia · edema da face · trismus · secreção excessiva de saliva · suspeita de abcesso cervical' },
    { name: 'Respiratório', body: 'Dispneia com esforço respiratório marcado · toracalgia intensa · saturação O₂ reduzida · FR ≥ 30 rpm' },
    { name: 'Abdominal / Urinário', body: 'Dor abdominal intensa · defesa muscular · icterícia · lombalgia intensa · calafrios com febre alta' },
    { name: 'Hipotermia', body: 'Em suspeita de infeção grave, a hipotermia (<35°C) é igualmente sinal de alarme — pode indicar sépsis grave em idoso, imunodeprimido ou com comorbilidades.' },
  ];
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">🚨</span>
        <div className="atb-detail-title">Sinais de Alarme — Infeções Graves</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT · Via Verde Sépsis DGS 2016</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-red">Febre + ≥ 1 critério = alarme</span>
          <span className="atb-tag atb-tag-amber">Calcular MEWS imediatamente</span>
        </div>
      </div>
      <div className="atb-section">
        <div className="atb-section-head">
          <span className="atb-pill atb-pill-red">Sinais e sintomas de alarme</span>
          <span className="atb-section-name">Perante febre, associada a pelo menos um dos seguintes</span>
        </div>
        <div className="atb-cards-grid">
          {cards.map((c, i) => (
            <div key={i} className="atb-card">
              <div className="atb-card-row"><div className="atb-card-name">{c.name}</div><span className="atb-badge atb-badge-red">Urgente</span></div>
              <div className="atb-card-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="atb-alert atb-alert-danger">
        <span className="atb-alert-icon">⚠</span>
        <div><strong>Ação imediata:</strong> Calcular MEWS · Referenciar ao hospital · Acompanhar com profissional de saúde · Ativar Via Verde da Sépsis se em contexto hospitalar.</div>
      </div>
    </>
  );
}

export function AwareTool() {
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">🌍</span>
        <div className="atb-detail-title">Classificação AWaRe — OMS 2017</div>
        <div className="atb-detail-meta">Access · Watch · Reserve — The WHO AWaRe Antibiotic Book, Geneva 2022</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-green">≥ 60% do consumo deve ser Access</span>
          <span className="atb-tag atb-tag-amber">Watch: monitorizar consumo</span>
          <span className="atb-tag atb-tag-red">Reserve: controlo estrito</span>
        </div>
      </div>

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-green">Access</span><span className="atb-section-name">1.ª escolha — baixo potencial de resistências</span></div>
        <div className="atb-aware-cols">
          <div className="atb-aware-col atb-aw-access">
            <div className="atb-aware-head">✓ Penicilinas e combos</div>
            <div className="atb-aware-body"><span className="atb-dp">Amoxicilina</span><span className="atb-dp">Benzilpenicilina</span><span className="atb-dp">Flucloxacilina</span><span className="atb-dp">Pivmecilinam</span></div>
          </div>
          <div className="atb-aware-col atb-aw-access">
            <div className="atb-aware-head">✓ Outros Access</div>
            <div className="atb-aware-body"><span className="atb-dp">Fosfomicina</span><span className="atb-dp">Nitrofurantoína</span><span className="atb-dp">Metronidazol</span><span className="atb-dp">Clindamicina</span><span className="atb-dp">Doxiciclina</span><span className="atb-dp">SMX+TMP</span></div>
          </div>
          <div className="atb-aware-col atb-aw-access">
            <div className="atb-aware-head">✓ Nota importante</div>
            <div className="atb-aware-body">Preferir sempre que adequado. A amoxicilina isolada deve substituir a combinação com ác. clavulânico na maioria das infeções respiratórias.</div>
          </div>
        </div>
      </div>

      <div className="atb-rule" />

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-amber">Watch</span><span className="atb-section-name">Usar só se Access inadequado</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Macrólidos</div><span className="atb-badge atb-badge-amber">Watch</span></div><div className="atb-card-body"><span className="atb-dp">Azitromicina</span><span className="atb-dp">Claritromicina</span><br /><br />Usar com parcimónia. <strong>Azitromicina: não usar empiricamente como antibiótico de conforto.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Quinolonas</div><span className="atb-badge atb-badge-amber">Watch</span></div><div className="atb-card-body"><span className="atb-dp">Ciprofloxacina</span><span className="atb-dp">Levofloxacina</span><span className="atb-dp">Moxifloxacina</span><br /><br />Alto potencial de resistências em gram-negativos. Quinolonas respiratórias <strong>não usar</strong> para outras infeções.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Cefalosporinas</div><span className="atb-badge atb-badge-amber">Watch</span></div><div className="atb-card-body"><span className="atb-dp">Cefuroxima</span><span className="atb-dp">Ceftriaxona</span><span className="atb-dp">Cefixima</span><br /><br />Evitar 3.ª geração em ambulatório (indução AmpC beta-lactamase).</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Outros Watch</div><span className="atb-badge atb-badge-amber">Watch</span></div><div className="atb-card-body"><span className="atb-dp">Amox+Ác. Clavulânico</span><span className="atb-dp">Vancomicina</span><br /><br />Substituir por amoxicilina isolada sempre que possível.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-red">Reserve</span><span className="atb-section-name">Últimas linhas — multirresistentes</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Antibióticos Reserve</div><span className="atb-badge atb-badge-red">Reserve</span></div><div className="atb-card-body"><span className="atb-dp">Colistina</span><span className="atb-dp">Linezolida</span><span className="atb-dp">Tigeciclina</span><span className="atb-dp">Ceftazidima+Avibactam</span><span className="atb-dp">Meropenem+Vaborbactam</span><br /><br />Reservar exclusivamente para microrganismos multirresistentes documentados.</div></div>
        </div>
      </div>

      <div className="atb-alert atb-alert-ok">
        <span className="atb-alert-icon">✓</span>
        <div><strong>Objetivo OMS:</strong> ≥ 60% do consumo total de antibióticos deve ser Access. Monitorizado pelo PAPA da ARS LVT.</div>
      </div>
    </>
  );
}

export function PrincipiosTool() {
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">📋</span>
        <div className="atb-detail-title">Princípios Gerais de Prescrição</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT Ed. 1.3 · Classificação AWaRe OMS 2022</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-green">Duração mais curta possível</span>
          <span className="atb-tag atb-tag-blue">Regressar aos velhos antibióticos</span>
        </div>
      </div>

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-red">Evitar</span><span className="atb-section-name">Antibióticos a usar com restrição</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">Evitar como 1.ª linha</div><div className="atb-card-row"><div><div className="atb-card-name">Quinolonas</div><div className="atb-card-mol">ciprofloxacina · levofloxacina · moxifloxacina</div></div><span className="atb-badge atb-badge-red">Watch</span></div><div className="atb-card-body">Alto potencial de resistências em gram-negativos. Efeitos músculo-tendinosos e cardíacos (EMA e FDA). Quinolonas "respiratórias" <strong>não devem ser usadas para outras infeções</strong> além das respiratórias graves.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Cefalosporinas 3.ª geração</div><div className="atb-card-mol">ceftriaxona em ambulatório</div></div><span className="atb-badge atb-badge-red">Watch</span></div><div className="atb-card-body">Alto potencial de indução de resistências por seleção de AmpC beta-lactamase. <strong>Cefuroxima</strong> (2.ª geração) também associada — usar apenas quando indicado.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Azitromicina sem indicação precisa</div><div className="atb-card-mol">macrólido de uso frequente</div></div><span className="atb-badge atb-badge-amber">Watch</span></div><div className="atb-card-body">Usar apenas em situações bem definidas. <strong>Não usar empiricamente como antibiótico "fácil"</strong> ou de conforto.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-green">Preferir</span><span className="atb-section-name">Boas práticas de prescrição</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">Regra principal</div><div className="atb-card-row"><div><div className="atb-card-name">Amoxicilina isolada</div><div className="atb-card-mol">em vez de amoxicilina + ácido clavulânico</div></div><span className="atb-badge atb-badge-green">Access</span></div><div className="atb-card-body">Na maioria das infeções respiratórias, a amoxicilina isolada é suficiente. A combinação com ác. clavulânico fica reservada para ATB prévia, imunossupressão, comorbilidades.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Doxiciclina e SMX+TMP</div><div className="atb-card-mol">os "velhos antibióticos"</div></div><span className="atb-badge atb-badge-green">Access</span></div><div className="atb-card-body">Eficácia preservada em múltiplas indicações. Menor impacto ecológico. <strong>Regressar a eles quando indicado.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Duração mínima eficaz</div><div className="atb-card-mol">mais curta que suficiente</div></div><span className="atb-badge atb-badge-green">Sempre</span></div><div className="atb-card-body">Tratamentos mais longos <strong>não aumentam a eficácia</strong> mas aumentam resistências, efeitos adversos e custos.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Microbiologia quando indicada</div><div className="atb-card-mol">urocultura · exsudados · hemoculturas</div></div><span className="atb-badge atb-badge-blue">Boas práticas</span></div><div className="atb-card-body">Solicitar antes de iniciar ATB em pielonefrite, prostatite, infeções recorrentes ou falência terapêutica. <strong>Adequar sempre ao antibiograma.</strong></div></div>
        </div>
      </div>
    </>
  );
}

export function SinaveTool() {
  const items = [
    { name: 'Campilobacteriose', desc: 'Diarreia aguda por Campylobacter spp.' },
    { name: 'Criptosporidiose', desc: 'Diarreia com confirmação de Cryptosporidium' },
    { name: 'Doença dos Legionários', desc: 'Pneumonia comunitária por Legionella pneumophila' },
    { name: 'D. Invasiva Pneumocócica', desc: 'Pneumonia por Streptococcus pneumoniae' },
    { name: 'D. Invasiva H. influenzae', desc: 'Pneumonia por Haemophilus influenzae' },
    { name: 'Giardíase', desc: 'Diarreia com identificação de Giardia lamblia' },
    { name: 'Gonorreia', desc: 'Uretrite · cervicite · DIP por Neisseria gonorrhoeae' },
    { name: 'Infeção por Chlamydia', desc: 'Balanite ou orquiepididimite por C. trachomatis' },
    { name: 'Raiva', desc: 'Mordedura por animal com infeção suspeita/confirmada' },
    { name: 'Salmoneloses', desc: 'Diarreia por Salmonella (não Typhi, não Paratyphi)' },
    { name: 'Shigelose', desc: 'Diarreia aguda por Shigella spp.' },
    { name: 'Sífilis Congénita', desc: 'Treponema pallidum em criança < 2 anos' },
    { name: 'Sífilis (excl. congénita)', desc: 'Primária/secundária com confirmação laboratorial' },
    { name: 'Tosse Convulsa', desc: 'Tosse com isolamento de Bordetella pertussis' },
  ];
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">📢</span>
        <div className="atb-detail-title">SINAVE — Notificação Obrigatória</div>
        <div className="atb-detail-meta">Lei n.º 81/2009 · Despacho n.º 1150/2021 · Sistema Nacional de Vigilância Epidemiológica</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-blue">Identificadas com SINAVE no guia</span>
          <span className="atb-tag atb-tag-amber">Notificar em sinave.dgs.pt</span>
        </div>
      </div>
      <div className="atb-alert atb-alert-info">
        <span className="atb-alert-icon">ℹ</span>
        <div><strong>O SINAVE</strong> utiliza desde 2014 uma aplicação informática que desmaterializa a notificação obrigatória, envolvendo médicos, serviços de saúde pública, laboratórios e autoridades de saúde.</div>
      </div>
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-blue">Infeções incluídas neste guia</span><span className="atb-section-name">Com registo obrigatório no SINAVE</span></div>
        <div className="atb-sinave-grid">
          {items.map((it, i) => (
            <div key={i} className="atb-sinave-item">
              <div className="atb-si-name">{it.name}</div>
              <div className="atb-si-desc">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function GravidaTool() {
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">🤰</span>
        <div className="atb-detail-title">Grávida e Aleitamento — Antibióticos</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT Ed. 1.3 · LactMed · CIMEF 808 250 143</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-green">✓ Seguro</span>
          <span className="atb-tag atb-tag-amber">⚠ Precaução</span>
          <span className="atb-tag atb-tag-red">🚫 Contraindicado</span>
        </div>
      </div>
      <div className="atb-alert atb-alert-info">
        <span className="atb-alert-icon">ℹ</span>
        <div><strong>Na dúvida:</strong> CIMEF — <strong>808 250 143</strong> (dias úteis, 9h–17h30). Consultar sempre o RCM.</div>
      </div>

      {/* Safe */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-green">Seguros / Aceites</span><span className="atb-section-name">Podem ser usados na gravidez e aleitamento</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">1.ª escolha na grávida</div><div className="atb-card-row"><div><div className="atb-card-name">Amoxicilina</div><div className="atb-card-mol">penicilina oral</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-green">✓ Gravidez</span><span className="atb-badge atb-badge-green">✓ Aleitamento</span></div></div><div className="atb-card-body"><strong>Segura durante toda a gravidez.</strong> 1.ª escolha em praticamente todas as indicações. Passa para o leite em baixas concentrações.</div></div>
          <div className="atb-card atb-card-star"><div className="atb-star-label">1.ª linha cistite na grávida</div><div className="atb-card-row"><div><div className="atb-card-name">Fosfomicina</div><div className="atb-card-mol">3000 mg toma única oral</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-green">✓ Gravidez</span><span className="atb-badge atb-badge-green">✓ Aleitamento</span></div></div><div className="atb-card-body"><strong>Segura e recomendada na cistite da grávida</strong> — toma única 3g oral. Bacteriúria assintomática na gravidez deve ser sempre tratada.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Cefalosporinas</div><div className="atb-card-mol">cefuroxima · ceftriaxona</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-green">✓ Gravidez</span><span className="atb-badge atb-badge-green">✓ Aleitamento</span></div></div><div className="atb-card-body"><strong>Seguras durante toda a gravidez.</strong> Úteis como alternativa às penicilinas em hip. não tipo I.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Benzilpenicilina benzatínica</div><div className="atb-card-mol">sífilis na grávida</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-green">✓ Gravidez</span><span className="atb-badge atb-badge-green">✓ Aleitamento</span></div></div><div className="atb-card-body"><strong>Única opção aceite para sífilis na gravidez.</strong> Se alérgica: <strong>dessensibilização obrigatória</strong> — referenciar para hospital.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Caution */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-amber">Precaução</span><span className="atb-section-name">Usar com cuidado — restrições por trimestre</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Amoxicilina + Ác. Clavulânico</div></div><span className="atb-badge atb-badge-amber">⚠ Cuidado</span></div><div className="atb-card-body">Evitar no 1.º trimestre se alternativa disponível. Aceite no 2.º e 3.º trimestres.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Azitromicina</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-amber">⚠ Cuidado</span><span className="atb-badge atb-badge-amber">⚠ Aleitamento</span></div></div><div className="atb-card-body">Evitar no 1.º trimestre se possível. <strong>Aleitamento:</strong> risco teórico de estenose pilórica em lactente &lt;6 semanas.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Metronidazol</div><div className="atb-card-mol">vaginose · tricomoníase</div></div><span className="atb-badge atb-badge-amber">⚠ 1.º trim.</span></div><div className="atb-card-body">Evitar no 1.º trimestre. <strong>Aceite no 2.º e 3.º trimestres.</strong> Aleitamento: doses habituais compatíveis.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Nitrofurantoína</div><div className="atb-card-mol">ITU não complicada</div></div><span className="atb-badge atb-badge-amber">⚠ 3.º trim.</span></div><div className="atb-card-body">Aceite no 1.º e 2.º trimestres. <strong>Evitar no 3.º e perto do parto</strong> — risco de anemia hemolítica no RN.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Clindamicina</div><div className="atb-card-mol">pele · MRSA</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-green">✓ Gravidez</span><span className="atb-badge atb-badge-amber">⚠ Aleitamento</span></div></div><div className="atb-card-body">Aceite durante toda a gravidez. <strong>Aleitamento:</strong> risco teórico de colite pseudomembranosa no lactente.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Contraindicated */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-red">Contraindicados</span><span className="atb-section-name">Não usar na gravidez e/ou aleitamento</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Doxiciclina</div><div className="atb-card-mol">tetraciclina</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-red">🚫 Gravidez</span><span className="atb-badge atb-badge-red">🚫 Aleitamento</span></div></div><div className="atb-card-body"><strong>Contraindicada durante toda a gravidez.</strong> Deposição no osso e dentes fetais — coloração permanente.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Quinolonas</div><div className="atb-card-mol">cipro · levo · moxifloxacina</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-red">🚫 Gravidez</span><span className="atb-badge atb-badge-red">🚫 Aleitamento</span></div></div><div className="atb-card-body"><strong>Contraindicadas durante toda a gravidez.</strong> Toxicidade articular em cartilagem em crescimento.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Sulfametoxazol + Trimetoprim</div><div className="atb-card-mol">co-trimoxazol</div></div><div className="atb-badges-col"><span className="atb-badge atb-badge-red">🚫 Gravidez</span><span className="atb-badge atb-badge-amber">⚠ Aleitamento</span></div></div><div className="atb-card-body"><strong>Evitar na gravidez.</strong> Trimetoprim antagonista do folato — risco de defeitos tubo neural no 1.º trimestre. Aleitamento: compatível em lactentes saudáveis &gt;1 mês.</div></div>
        </div>
      </div>
    </>
  );
}

export function DiferidaTool() {
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">⏳</span>
        <div className="atb-detail-title">Prescrição Diferida</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT Ed. 1.3 · NICE guidelines</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-green">Reduz consumo de antibióticos</span>
          <span className="atb-tag atb-tag-blue">Mantém segurança do doente</span>
        </div>
      </div>

      <div className="atb-alert atb-alert-ok">
        <span className="atb-alert-icon">✓</span>
        <div><strong>O que é?</strong> O médico emite uma receita que o doente <strong>só avulta se os sintomas não melhorarem</strong> dentro de um prazo definido. Estratégia com evidência sólida.</div>
      </div>

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-blue">Como fazer</span><span className="atb-section-name">Três passos para a prescrição diferida</span></div>
        <div className="atb-defer-steps">
          <div className="atb-defer-step"><div className="atb-ds-num">Passo 1 — Avaliar</div><div className="atb-ds-body">Confirmar que <strong>não há indicação de ATB imediato</strong>. Indicada em patologias frequentemente virais: rinossinusite · OMA (&gt;2 anos) · traqueobronquite · amigdalofaringite sem critérios.</div></div>
          <div className="atb-defer-step"><div className="atb-ds-num">Passo 2 — Explicar</div><div className="atb-ds-body">Explicar que a maioria das infeções resolve espontaneamente. Definir <strong>prazo de espera</strong> (em dias). Dar instruções escritas claras sobre <strong>sinais de alarme</strong>.</div></div>
          <div className="atb-defer-step"><div className="atb-ds-num">Passo 3 — Prescrever</div><div className="atb-ds-body">Emitir receita com o <strong>antibiótico adequado</strong>. Definir critérios de início: febre persistente · agravamento · ausência de melhoria após o prazo.</div></div>
        </div>
        <div className="atb-defer-flags">
          <div className="atb-df atb-df-go"><strong>✓ Indicada habitualmente</strong><br />Rinossinusite aguda sem critérios · OMA leve (&gt;2 anos) · Traqueobronquite aguda · Amigdalofaringite sem McIsaac · Diarreia aguda leve/moderada</div>
          <div className="atb-df atb-df-no"><strong>✕ Não indicada se</strong><br />Sinais de alarme · MEWS ≥ 3 · Imunossupressão · Pneumonia · Pielonefrite · Criança &lt;6 meses · Doente incapaz de monitorizar · Situação instável</div>
        </div>
      </div>

      <div className="atb-rule" />

      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-purple">Comunicação</span><span className="atb-section-name">Como explicar ao doente</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">Mensagem principal</div><div className="atb-card-row"><div className="atb-card-name">"A receita existe, mas talvez não precise dela"</div></div><div className="atb-card-body">O doente sente-se seguro. &gt;60% dos doentes com prescrição diferida <strong>não chegam a tomar o antibiótico</strong>.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Critérios de início claros</div></div><div className="atb-card-body">"Iniciar o antibiótico se febre &gt; X dias, se os sintomas piorarem, ou se não houver melhoria ao fim de ___ dias."</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Sinais de alarme para voltar</div></div><div className="atb-card-body">Febre &gt;39°C persistente · dificuldade em engolir/respirar · prostração · piora súbita após melhoria — voltar imediatamente.</div></div>
        </div>
      </div>
    </>
  );
}

export function EscalonamentoTool() {
  return (
    <>
      <div className="atb-detail-header">
        <span className="atb-emoji">📈</span>
        <div className="atb-detail-title">Escalonamento de Antibióticos</div>
        <div className="atb-detail-meta">Guia de Bolso PAPA ARS LVT Ed. 1.3 · Stewardship antimicrobiano</div>
        <div className="atb-tag-row">
          <span className="atb-tag atb-tag-green">De-escalar sempre que possível</span>
          <span className="atb-tag atb-tag-amber">Escalar com critério</span>
          <span className="atb-tag atb-tag-red">Trocar ≠ escalar</span>
        </div>
      </div>

      <div className="atb-alert atb-alert-info">
        <span className="atb-alert-icon">ℹ</span>
        <div><strong>O que é?</strong> Escalar = espectro mais alargado. De-escalar = opção mais dirigida após confirmação microbiológica. Em ambulatório, a de-escalada é mais frequente e mais importante.</div>
      </div>

      {/* Escalar */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-red">Escalar</span><span className="atb-section-name">Quando passar para espectro mais alargado</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">Critério principal</div><div className="atb-card-row"><div className="atb-card-name">Falência terapêutica documentada</div><span className="atb-badge atb-badge-amber">48–72h</span></div><div className="atb-card-body">Ausência de melhoria após <strong>48–72h de ATB adequado em dose correta</strong>. Antes de escalar: confirmar diagnóstico, adesão e dose.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Agravamento clínico</div><span className="atb-badge atb-badge-red">Urgente</span></div><div className="atb-card-body">Progressão dos sintomas · sinais de alarme · MEWS a aumentar. <strong>A referenciação hospitalar pode ser mais adequada.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Resultado microbiológico</div><span className="atb-badge atb-badge-blue">Dirigido</span></div><div className="atb-card-body">Isolamento de microrganismo resistente ao ATB inicial. <strong>Escalonamento dirigido pelo antibiograma — não empírico.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Fatores de risco para resistência</div><span className="atb-badge atb-badge-amber">Considerar</span></div><div className="atb-card-body">ATB nos últimos 30–90 dias · hospitalização recente · infeção recorrente · imunossupressão.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* De-escalar */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-green">De-escalar</span><span className="atb-section-name">Passar para antibiótico mais dirigido</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card atb-card-star"><div className="atb-star-label">Regra de ouro</div><div className="atb-card-row"><div className="atb-card-name">Após resultado microbiológico</div><span className="atb-badge atb-badge-green">Sempre</span></div><div className="atb-card-body">Quando antibiograma confirma sensibilidade a opção mais estreita, <strong>mudar sempre para ela</strong>. Ex: amox+clav → amoxicilina isolada.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">Melhoria clínica evidente</div><span className="atb-badge atb-badge-green">48–72h</span></div><div className="atb-card-body">Após melhoria sustentada, considerar reduzir espectro ou duração. <strong>Não é necessário completar sempre o curso completo.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">IV → Oral (switch)</div><span className="atb-badge atb-badge-green">SOAT</span></div><div className="atb-card-body">Após estabilização com ATB IV, transitar para equivalente oral com boa biodisponibilidade. Ex: ciprofloxacina IV → oral.</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Sequências */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-blue">Referência rápida</span><span className="atb-section-name">Sequências de escalonamento mais comuns</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">ITU não complicada — Mulher</div><div className="atb-card-mol">falência da 1.ª linha</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Nitrofurantoína / Fosfomicina / Pivmecilinam<br /><strong>↓</strong> SMX+TMP ou Amox+Clav.<br /><strong>↓</strong> Urocultura+antibiograma obrigatório<br /><strong>↓</strong> Ciprofloxacina (conforme TSA)</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Pneumonia comunitária</div><div className="atb-card-mol">sem melhoria às 48–72h</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Amoxicilina 1g 8/8h<br /><strong>↓</strong> Adicionar Azitromicina (atípicos)<br /><strong>↓</strong> Referenciar — considerar Levofloxacina<br /><em>Rever diagnóstico antes de escalar</em></div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Amigdalofaringite</div><div className="atb-card-mol">falência ou recidiva</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Amoxicilina 10 dias<br /><strong>↓</strong> Amox+Clav. (beta-lactamase)<br /><strong>↓</strong> Azitromicina 5 dias (hip. tipo I)<br /><strong>↓</strong> Clindamicina 10 dias</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Infeção pele / Celulite</div><div className="atb-card-mol">sem melhoria às 48–72h</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Flucloxacilina oral 6/6h<br /><strong>↓</strong> Amox+Clav. (gram-negativos)<br /><strong>↓</strong> SMX+TMP ou Clindamicina (MRSA)<br /><strong>↓</strong> Referenciar urgente — excluir fasceíte</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">Otite média aguda</div><div className="atb-card-mol">falência da 1.ª linha</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Amoxicilina dose standard<br /><strong>↓</strong> Amoxicilina dose alta<br /><strong>↓</strong> Amox+Clav. (H. influenzae)<br /><strong>↓</strong> Ceftriaxona IM + reavaliação ORL</div></div>
          <div className="atb-card"><div className="atb-card-row"><div><div className="atb-card-name">DPOC exacerbada</div><div className="atb-card-mol">sem melhoria ou agravamento</div></div></div><div className="atb-card-body"><strong>1.ª:</strong> Amoxicilina<br /><strong>↓</strong> Amox+Clav. (gram-negativos)<br /><strong>↓</strong> Levofloxacina ou Moxifloxacina<br /><strong>↓</strong> Referenciar pneumologia (Pseudomonas)</div></div>
        </div>
      </div>

      <div className="atb-rule" />

      {/* Before escalating */}
      <div className="atb-section">
        <div className="atb-section-head"><span className="atb-pill atb-pill-red">Antes de escalar</span><span className="atb-section-name">Verificar sempre estes 4 pontos</span></div>
        <div className="atb-cards-grid">
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">1. Confirmar o diagnóstico</div></div><div className="atb-card-body">Falta de resposta pode indicar diagnóstico errado ou complicação não identificada (ex: abcesso).</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">2. Confirmar adesão e dose</div></div><div className="atb-card-body">A não-adesão é a causa mais comum de aparente falência — especialmente em regimes 3–4 tomas/dia.</div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">3. Solicitar microbiologia</div></div><div className="atb-card-body">Antes de escalar empiricamente, obter urocultura, exsudado ou amostra relevante. <strong>Dirigido é sempre preferível ao empírico.</strong></div></div>
          <div className="atb-card"><div className="atb-card-row"><div className="atb-card-name">4. Considerar referenciação</div></div><div className="atb-card-body">MEWS ≥ 3 ou sinais de alarme → <strong>referenciar antes de tentar novo antibiótico</strong>.</div></div>
        </div>
      </div>

      <div className="atb-alert atb-alert-ok">
        <span className="atb-alert-icon">✓</span>
        <div><strong>Regra geral:</strong> A duração mais curta eficaz é preferível à escalada. Antes de escalar: confirmar diagnóstico · adesão · dose · microbiologia · ausência de sinais de alarme.</div>
      </div>
    </>
  );
}
