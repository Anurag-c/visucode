import re
from .base_runner import BaseRunner


class PythonRunner(BaseRunner):
    def get_docker_image(self):
        return "sowmithkatkuri/python-runner"

    def get_output_filename(self):
        if any(lib in self.code for lib in ["plotly", "bokeh", "mpld3"]):
            return f"{self.file_id}.html"
        return f"{self.file_id}.png"

    def preprocess_code(self):
        output_path = f"/app/output/{self.get_output_filename()}"
        processed = self.code

        match = re.search(r"import matplotlib\.pyplot as (\w+)", code)
        if match:
            alias = match.group(1)
            code = code.replace(f"{alias}.show()",
                                f"{alias}.savefig('{output_path}')")

        if "plotly" in processed and "write_html" not in processed:
            processed += f"\nfig.write_html('{output_path}')"

        return processed
