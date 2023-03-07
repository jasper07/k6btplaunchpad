# Test performance as early as possible
As organizations move more of their applications to the cloud, it's becoming increasingly important for developers to ensure that their applications are performing optimally in cloud environments. This means that performance testing and load testing need to be incorporated into the development process from the very beginning, rather than later as an afterthought.

By incorporating performance testing and load testing into the Definition of Done (DoD) of a user story, not only ensures that stakeholders expectations are met, but it allows developers to incorporate performance testing and load testing into the development process. Meaning they can identify and address performance issues early in the development process. This can save time and money in the long run, as it is typically easier and less expensive to fix performance issues early in the development process than it is to fix them later.

To incorporate performance testing in-sprint, developers need to use tools and techniques that are designed for this purpose. One such tool is k6, an open-source load testing tool that is designed to be easy to use and integrate into the development process. With k6, developers can write load testing scripts in JavaScript, which makes it easy to incorporate load testing into existing development workflows.
Another technique that can be used for is continuous performance testing. With continuous performance testing, developers can automate the performance testing process and run performance tests continuously throughout the development process. This can help to identify performance issues as soon as they arise, rather than waiting for scheduled performance tests.

# Why K6?
- K6 tests are written in JavaScript which means a familiar low barrier to entry for developers.
- K6 is open source, which means it is free to use and can be customized as needed. This can be particularly useful for small teams or individual developers who may not have the budget for a commercial performance testing tool like LoadRunner.
- K6 collects a wide range of performance metrics during testing, including response times, error rates, and resource utilization. These metrics can be used to identify performance issues and ensure that SLAs are being met.
- K6 allows developers to set thresholds for performance metrics. If a threshold is exceeded during testing, K6 can automatically fail the test, indicating that the SLA has not been met.

# Conclusion
K6 has integrations with a wide range of tools, including Grafana, InfluxDB, and Jenkins etc. This can make it easier to analyse and visualize test results and integrate into DevOps workflows.
Overall, performance testing is an essential part of the development process for developing for the cloud. By incorporating performance testing and load testing into each sprint, developers can identify and address performance issues early in the development process, which can save time and money in the long run. With the right tools and techniques, in-sprint performance testing can be easily integrated into existing development workflows.
