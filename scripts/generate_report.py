import sys
import json
import tempfile
import os
import uuid
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_pdf(data):
    filename = os.path.join(tempfile.gettempdir(), f"report_{uuid.uuid4().hex}.pdf")
    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4
    
    # Title
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, height - 80, "Relatorio de Progresso Academico")
    
    # Overview / Stats
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 130, "Visao Geral")
    
    c.setFont("Helvetica", 12)
    stats = data.get("stats", {})
    c.drawString(50, height - 150, f"Carga Horaria Total: {stats.get('totalWorkload', 0)}h")
    c.drawString(50, height - 170, f"Tarefas Concluidas: {stats.get('completedTasks', 0)}")
    c.drawString(50, height - 190, f"Tarefas Pendentes: {stats.get('pendingTasks', 0)}")
    
    # Subjects
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 230, "Disciplinas Ativas")
    
    y = height - 250
    c.setFont("Helvetica", 10)
    for sub in data.get("subjects", []):
        if y < 100:
            c.showPage()
            y = height - 50
            c.setFont("Helvetica", 10)
        c.drawString(50, y, f"- {sub.get('name', 'N/A')} ({sub.get('workload', 0)}h) - {sub.get('professor', 'N/A')}")
        y -= 20
        
    # Tasks Backlog
    y -= 20
    if y < 150:
        c.showPage()
        y = height - 50
        
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Backlog de Tarefas")
    y -= 20
    
    c.setFont("Helvetica", 10)
    # Using task status properly formatted in pt-BR conceptually matching the output requirement
    for task in data.get("tasks", []):
        if y < 100:
            c.showPage()
            y = height - 50
            c.setFont("Helvetica", 10)
        status = "Concluida" if task.get("status") == "completed" else "Pendente"
        c.drawString(50, y, f"[{status}] {task.get('title', 'Sem titulo')}")
        y -= 20
        
    c.save()
    print(filename)

if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        generate_pdf(data)
    except Exception as e:
        sys.stderr.write(str(e))
        sys.exit(1)
