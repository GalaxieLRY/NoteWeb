---
title: "Prompt设计原则"
date: 2025-07-16
draft: false
---

本文主要介绍了Prompt设计的两大原则。

## 1 编写清晰、具体的指令
首先，Prompt 需要清晰明确地表达需求，提供充足上下文，使语言模型准确理解我们的意图，就像向一 个外星人详细解释人类世界一样。过于简略的 Prompt 往往使模型难以把握所要完成的具体任务。并不是说 Prompt 就必须非常短小简洁。事实上，在许多情况下，更长、更复杂的 Prompt 反而会让语言模型更容易抓住关键点，给出符合预期的回复。原因在于，复杂的 Prompt 提供了更丰富的上下文和细节，让模型可以更准确地把握所需的操作和响应方式。

所以，记住用清晰、详尽的语言表达 Prompt，就像在给外星人讲解人类世界一样，“Adding more context helps the model understand you better.”。

### 1.1 使用分隔符清晰地表示输入的不同部分
在编写 Prompt 时，我们可以使用各种标点符号作为“分隔符”，将不同的文本部分区分开来。分隔符就像是Prompt 中的墙，将不同的指令、上下文、输入隔开，避免意外的混淆。你可以选择用 ```，"""，< >，，: 等做分隔符，只要能明确起到隔断作用即可。

使用分隔符尤其重要的是要防止提示词注入（Prompt Rejection）。

提示词注入（Prompt Rejection）：就是用户输入的文本可能包含与你的预设 Prompt 相冲突的内容，如果不加分隔，这些输入就可能“注入”并操纵语言模型，轻则导致模型产生毫无关联的乱七八糟的输出，严重的话可能造成应用的安全风险。

### 1.2 寻求结构化的输出
有时候我们需要语言模型给我们一些结构化的输出，而不仅仅是连续的文本。什么是结构化输出呢？就是按照某种格式组织的内容，例如JSON、HTML等。这种输出非常适合在代码中进一步解析和处理。例如，您可以在 Python 中将其读入字典或列表中。

```python
prompt = f"""
请生成包括书名、作者和类别的三本虚构的、非真实存在的中文书籍清单，\
并以 JSON 格式提供，其中包含以下键:book_id、title、author、genre。
"""
```

### 1.3 要求模型检查是否满足条件
如果任务包含不一定能满足的假设（条件），我们可以告诉模型先检查这些假设，如果不满足，则会指 出并停止执行后续的完整流程。您还可以考虑可能出现的边缘情况及模型的应对，以避免意外的结果或 错误发生。

### 1.4 提供少量示例
"Few-shot" prompting（少样本提示），即在要求模型执行实际任务之前，给模型一两个已完成的样例，让模型了解我们的要求和期望的输出样式。

## 2 给模型时间去思考
在设计 Prompt 时，给予语言模型充足的推理时间非常重要。语言模型与人类一样，需要时间来思考并 解决复杂问题。如果让语言模型匆忙给出结论，其结果很可能不准确。例如，若要语言模型推断一本书 的主题，仅提供简单的书名和一句简介是不足够的。这就像让一个人在极短时间内解决困难的数学题， 错误在所难免。

相反，我们应通过 Prompt 引导语言模型进行深入思考。可以要求其先列出对问题的各种看法，说明推 理依据，然后再得出最终结论。在 Prompt 中添加逐步推理的要求，能让语言模型投入更多时间逻辑思 维，输出结果也将更可靠准确。

综上所述，给予语言模型充足的推理时间，是 Prompt Engineering 中一个非常重要的设计原则。这将大 大提高语言模型处理复杂问题的效果，也是构建高质量 Prompt 的关键之处。开发者应注意给模型留出 思考空间，以发挥语言模型的最大潜力。

### 2.1 指定完成任务所需的步骤
```python
prompt = f"""
1-用一句话概括下面用<>括起来的文本。
2-将摘要翻译成英语。
3-在英语摘要中列出每个名称。
4-输出一个 JSON 对象，其中包含以下键：English_summary，num_names。
请使用以下格式：
文本：<要总结的文本>
摘要：<摘要>
翻译：<摘要的翻译>
名称：<英语摘要中的名称列表>
输出 JSON：<带有 English_summary 和 num_names 的 JSON>
Text: <{text}>
"""
```

### 2.2 指导模型在下结论之前找出一个自己的解法
在设计 Prompt 时，我们还可以通过明确指导语言模型进行自主思考，来获得更好的效果。 举个例子，假设我们要语言模型判断一个数学问题的解答是否正确。仅仅提供问题和解答是不够的，语 言模型可能会匆忙做出错误判断。

相反，我们可以在 Prompt 中先要求语言模型自己尝试解决这个问题，思考出自己的解法，然后再与提 供的解答进行对比，判断正确性。这种先让语言模型自主思考的方式，能帮助它更深入理解问题，做出 更准确的判断。

```python
prompt = f"""
请判断学生的解决方案是否正确，请通过如下步骤解决这个问题：
步骤：
首先，自己解决问题。
然后将您的解决方案与学生的解决方案进行比较，对比计算得到的总费用与学生计算的总费用是否一致，
并评估学生的解决方案是否正确。
在自己完成问题之前，请勿决定学生的解决方案是否正确。
使用以下格式：
问题：问题文本
学生的解决方案：学生的解决方案文本
实际解决方案和步骤：实际解决方案和步骤文本
学生计算的总费用：学生计算得到的总费用
实际计算的总费用：实际计算出的总费用
学生计算的费用和实际计算的费用是否相同：是或否
学生的解决方案和实际解决方案是否相同：是或否
学生的成绩：正确或不正确
问题：
我正在建造一个太阳能发电站，需要帮助计算财务。
- 土地费用为每平方英尺100美元
- 我可以以每平方英尺250美元的价格购买太阳能电池板
- 我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元;
作为平方英尺数的函数，首年运营的总费用是多少。
学生的解决方案：
设x为发电站的大小，单位为平方英尺。
费用：
1. 土地费用：100x美元
2. 太阳能电池板费用：250x美元
3. 维护费用：100,000+100x=10万美元+10x美元
总费用：100x美元+250x美元+10万美元+100x美元=450x+10万美元
实际解决方案和步骤：
"""
```

在开发与应用语言模型时，需要注意它们可能生成虚假信息的风险。尽管模型经过大规模预训练，掌握 了丰富知识，但它实际上并没有完全记住所见的信息，难以准确判断自己的知识边界，可能做出错误推断。若让语言模型描述一个不存在的产品,它可能会自行构造出似是而非的细节。这被称为“幻觉” (Hallucination)，是语言模型的一大缺陷。

