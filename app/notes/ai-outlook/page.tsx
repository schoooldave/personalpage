import Link from "next/link";
import styles from "../system-process/system-process.module.css";

export default function AiOutlookPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Field Notes 导航"><Link href="/" className={styles.brand}>现代工作笔记</Link><span>FMCG FIELD NOTES / 04</span></nav>
      <header className={styles.hero}>
        <div className={styles.number}>04</div>
        <div><p className={styles.eyebrow}>FROM DIGITAL PRACTICE TO AI CAPABILITY</p><h1>从真实业务问题，走向下一代工作方式</h1><h2>我关注的不是给系统增加一个 AI 功能，而是让它开始理解业务现场、辅助判断，并推动下一步行动。</h2><p>AI 展望不是对过去项目的重新包装，而是从真实业务问题继续向前推演。</p></div>
        <aside className={styles.aside}><strong>这篇文章讨论什么？</strong><p>当数据、系统和组织之间仍有断点，AI 可以在哪些环节真正帮助业务？</p></aside>
      </header>

      <section className={styles.compare}><div className={styles.sectionHead}><h2>AI 的价值，不在于增加一个入口，而在于缩短问题到行动的距离。</h2><span>FROM PROBLEM TO ACTION</span></div><div className={styles.compareGrid}><div className={styles.compareColumn}><h3><small>理解</small>先看懂业务现场</h3><div className={styles.compareItem}><b>识别异常</b><p>从库存、分销、门店和执行数据中发现值得关注的变化。</p></div></div><div className={`${styles.compareColumn} ${styles.compareReal}`}><h3><small>判断</small>帮助人理解问题</h3><div className={styles.compareItem}><b>解释原因</b><p>把异常放回业务情境，帮助角色理解发生了什么。</p></div></div></div></section>

      <article className={styles.essay}>
        <section className={styles.section}><div className={styles.index}><strong>01</strong><span>数据 / 从记录到判断</span></div><div className={styles.copy}><h2>数据需要先被理解，才可能产生价值。</h2><p>在分销数据治理中，系统能够获得经销商上传的数据，但数据本身并不会自动变成经营判断。下一步的 AI 能力，应该帮助识别异常、解释变化，并把信息转成业务角色能够理解的行动线索。</p><p>这不是替代销售或管理者做决定，而是减少他们在整理、比对和定位问题上的重复工作。</p><p className={styles.quote}>让数据从“被提交”走向“能被使用”。</p></div><aside className={styles.source}><small>实践来源 / DMS</small><h3>分销数据治理项目</h3><p>原始文件解析、上传治理、异常处理和管理追踪，为 AI 识别与解释提供了真实问题场景。</p><Link href="/cases/dms" className={styles.sourceLink}>查看 DMS 项目 ↗</Link></aside></section>
        <section className={styles.section}><div className={styles.index}><strong>02</strong><span>执行 / 从填报到协助</span></div><div className={styles.copy}><h2>AI 应该首先减少一线的重复负担。</h2><p>销售执行中，复杂的门店标准往往被拆成大量字段、选择项和评分规则。一线需要花时间完成记录，系统却不一定能减少判断成本。</p><p>通过图片识别、语音输入和智能预填，AI 可以辅助识别门店陈列、产品铺货与执行结果，让销售把更多时间放回门店沟通和业务改善。</p><p className={styles.quote}>从“完成填报”走向“改善执行”。</p></div><aside className={styles.source}><small>实践来源 / SFA</small><h3>销售执行产品线</h3><p>门店评分、陈列标准和一线填写负担，构成了 AI 识别与自动采集的真实应用基础。</p><Link href="/cases/sfa" className={styles.sourceLink}>查看 SFA 项目 ↗</Link></aside></section>
        <section className={styles.section}><div className={styles.index}><strong>03</strong><span>组织 / 从建议到行动</span></div><div className={styles.copy}><h2>AI 可以辅助判断，但不能替代组织协同。</h2><p>AI 能够识别问题、解释原因并给出建议，但目标设定、利益协调、责任分配和最终决策仍然属于组织。真正有效的 AI，需要进入已有的流程和管理机制，成为角色之间更短的反馈链路。</p><p>因此，AI 的落地不是单独部署一个模型，而是重新思考问题如何被发现、分派、处理和反馈。</p><p className={styles.quote}>AI 增强人的判断，组织承接判断的结果。</p></div><aside className={styles.source}><small>能力展望 / 04</small><h3>从项目经验继续向前</h3><p>未来的重点不是预测一个漂亮的结果，而是让问题更早被看见，让下一步动作更容易发生。</p></aside></section>
      </article>

      <section className={styles.ending}><div className={styles.mark}>→</div><div><h2>下一代工作方式，不是让系统替人工作，而是让人更少被系统的重复工作拖住。</h2><p>这也是我从数字化项目继续走向 AI 能力时，最想保留的判断。</p></div></section>
      <footer className={styles.footer}><Link href="/">← 回到工作首页</Link><span>从真实问题出发，继续推演下一步。</span></footer>
    </main>
  );
}
